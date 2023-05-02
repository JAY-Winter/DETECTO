package com.detecto.ros

import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.hardware.Camera
import android.hardware.usb.*
import android.os.Bundle
import android.util.Log
import android.view.SurfaceHolder
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.detecto.ros.databinding.ActivityMainBinding
import com.detecto.ros.socket.RabbitConfig
import com.rabbitmq.client.AMQP
import com.rabbitmq.client.DefaultConsumer
import com.rabbitmq.client.Envelope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.IOException
import android.Manifest
import android.graphics.ImageFormat
import android.graphics.Rect
import android.graphics.YuvImage
import java.io.ByteArrayOutputStream
import java.util.*


const val TAG = "MainActivity"
class MainActivity : AppCompatActivity() {
    private var usbConnection: UsbDeviceConnection? = null
    private var usbInterface: UsbInterface? = null
    private var usbEndpointOut: UsbEndpoint? = null
    private val ACTION_USB_PERMISSION = "com.detecto.ros.USB_PERMISSION"
    private lateinit var binding: ActivityMainBinding

    private val previewCallback = Camera.PreviewCallback { data, _ ->
        sendFrameToServer(data)
    }

    companion object {
        private const val CAMERA_PERMISSION_REQUEST_CODE = 100
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val filter = IntentFilter()
        filter.addAction(ACTION_USB_PERMISSION)
        registerReceiver(usbReceiver, filter)
        binding.surfaceView.holder.addCallback(surfaceHolderCallback)
        // USB 디바이스 연결 권한 요청
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), CAMERA_PERMISSION_REQUEST_CODE)
        } else {
            camera = Camera.open()
        }


        val usbManager = getSystemService(Context.USB_SERVICE) as UsbManager
        for (device in usbManager.deviceList.values) {
            if (device.vendorId == 0x2341 && device.productId == 0x0043) {
                val permissionIntent = PendingIntent.getBroadcast(this, 0, Intent(ACTION_USB_PERMISSION), 0)
                usbManager.requestPermission(device, permissionIntent)
                break
            }
        }

        CoroutineScope(Dispatchers.IO).launch {
            RabbitConfig.setupConnectionFactory()
            RabbitConfig.createConnection()
            RabbitConfig.receiveMessage("control", object : DefaultConsumer(RabbitConfig.channel) {
                override fun handleDelivery(
                    consumerTag: String?,
                    envelope: Envelope?,
                    properties: AMQP.BasicProperties?,
                    body: ByteArray
                ) {
                    try {
                        val command = String(body)
                        Log.i(TAG, "${command}")
                        sendDataToArduino(command)
                    } catch (e: Exception) {
                        Log.e(TAG, "handleDelivery: ${e.message}")
                    }
                }
            })
        }

    }
    private val usbReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            if (intent.action ==ACTION_USB_PERMISSION) {
                val granted: Boolean = intent.extras!!.getBoolean(UsbManager.EXTRA_PERMISSION_GRANTED)
                if (granted) {
                    val usbDevice: UsbDevice? = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE)
                    usbDevice?.apply {
                        // USB 디바이스에 대한 권한이 부여되면 시리얼 통신을 시작합니다.
                        startUsbConnection(this)
                    }
                }
            }
        }
    }



    private fun startUsbConnection(usbDevice: UsbDevice) {
        val usbManager = getSystemService(Context.USB_SERVICE) as UsbManager
        usbConnection = usbManager.openDevice(usbDevice)
        usbInterface = usbDevice.getInterface(0)
        usbConnection?.claimInterface(usbInterface, true)

        for (i in 0 until usbInterface!!.endpointCount) {
            val endpoint = usbInterface!!.getEndpoint(i)
            if (endpoint.direction == UsbConstants.USB_DIR_OUT) {
                usbEndpointOut = endpoint
                break
            }
        }
    }

    fun sendDataToArduino(data: String) {
        usbConnection?.bulkTransfer(usbEndpointOut, data.toByteArray(), data.length, 0)
    }



    private var camera: Camera? = null
    private val surfaceHolderCallback = object : SurfaceHolder.Callback {
        override fun surfaceCreated(holder: SurfaceHolder) {
            try {
                camera?.apply {
                    setPreviewDisplay(holder)
                    startPreview()
                }
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }

        override fun surfaceChanged(holder: SurfaceHolder, format: Int, width: Int, height: Int) {
            if (holder.surface == null) return
            try {
                camera?.apply {
                    stopPreview()
                    setPreviewDisplay(holder)
                    setPreviewCallback(previewCallback)
                    startPreview()
                }
            } catch (e: IOException) {
                e.printStackTrace()
            }
        }

        override fun surfaceDestroyed(holder: SurfaceHolder) {
            camera?.apply {
                stopPreview()
                release()
            }
            camera = null
        }
    }
    fun sendFrameToServer(yuvData: ByteArray) {
        // 카메라 프레임을 JPEG로 인코딩
        val yuvImage = YuvImage(yuvData, ImageFormat.NV21, 640, 640, null)
        val outputStream = ByteArrayOutputStream()
        yuvImage.compressToJpeg(Rect(0, 0, 640, 640), 90, outputStream)
        val jpegData = outputStream.toByteArray()
        //TODO!! 이미지 전송해야함

    }
}