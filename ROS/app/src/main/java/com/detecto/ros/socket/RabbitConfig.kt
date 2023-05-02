package com.detecto.ros.socket
import android.util.Log
import com.rabbitmq.client.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

const val TAG = "[RABBIT]"
object RabbitConfig {
    private lateinit var factory: ConnectionFactory
    private lateinit var connection: Connection
    lateinit var channel: Channel
    private lateinit var commandTag: String
    init {
    }

    fun setupConnectionFactory() {
        factory = ConnectionFactory().apply {
            host = "k8d201.p.ssafy.io"
            port = 5672
            username = "guest"
            password = "guest"
        }
    }

    fun createConnection() {
        connection = factory.newConnection()
        channel = connection.createChannel()
    }

    fun sendImg(queueName: String, message: String) {
        channel.queueDeclare(queueName, false, false, false, null)
        channel.basicPublish("", queueName, null, message.toByteArray())
    }

    // 콜백 함수에서 아두이노로 명령 전달
    fun receiveMessage(queueName: String, callback: DefaultConsumer) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                commandTag =
                    channel?.basicConsume(queueName, true, callback) ?: ""
            } catch (e: Exception) {
                Log.e(TAG, "subscribeMatching: ${e.message}")
            }
        }
    }

}