
#include <AFMotor.h>
#include <Adafruit_MotorShield.h>
#include <Servo.h> 

const int trigPin = 14;
const int echoPin = 15;

// DC motor on M2

//앞 왼
AF_DCMotor motor1(1);
//앞 오
AF_DCMotor motor4(4);

//뒤 왼
AF_DCMotor motor2(2);

//뒤 오
AF_DCMotor motor3(3);
Servo servo1;
// DC hobby servo


// Stepper motor on M3+M4 48 steps per revolution

// AF_Stepper stepper(48, 2);


long duration;
int distance;

void setup() {

  Serial.begin(9600);           // set up Serial library at 9600 bps

  Serial.println("Motor party!");

  

  // turn on servo

  servo1.attach(10);

   

  // turn on motor #2

  motor2.setSpeed(100);
  motor3.setSpeed(170);

  motor2.run(RELEASE);
  motor3.run(RELEASE);
  motor1.setSpeed(100);
  motor4.setSpeed(170);

  motor1.run(RELEASE);
  motor4.run(RELEASE);
  
  // pinMode(trigPin, OUTPUT);
  // pinMode(echoPin, INPUT);

}



int i;



// Test the DC motor, stepper and servo ALL AT ONCE!

void loop() {
    if (Serial.available() > 0) {
      char command = Serial.read();
      switch(command) {
        case 'w':
          motor2.run(BACKWARD);
          motor3.run(BACKWARD);
          motor1.run(BACKWARD);
          motor4.run(BACKWARD);
          delay(100);
          motor2.run(RELEASE);
          motor3.run(RELEASE);
          motor1.run(RELEASE);
          motor4.run(RELEASE);
          break;
        case 's':
          motor2.run(FORWARD);
          motor3.run(FORWARD);
          motor1.run(FORWARD);
          motor4.run(FORWARD);
          delay(100);
          motor2.run(RELEASE);
          motor3.run(RELEASE);
          motor1.run(RELEASE);
          motor4.run(RELEASE);
          break;
        case '1':
          servo1.write(0);
          break;
        case '0':
          servo1.write(180);
          break;
      }
    }
    // servo1.write(70);
    // delay(100000); // 움직임 간격을 위한 시간 지연
    // servo1.write(0); // 서보 모터의 위치를 변
    // delay(1000); // 움직임 간격을 위한 시간 지연
  // digitalWrite(trigPin, LOW);
  // delayMicroseconds(2);
  // digitalWrite(trigPin, HIGH);
  // delayMicroseconds(10);
  // digitalWrite(trigPin, LOW);
  
  // // 거리 측정
  // duration = pulseIn(echoPin, HIGH);
  // distance = duration * 0.0344 / 2;
  // if (distance <= 70) {
  // // 거리 출력
  //   Serial.print("Distance: ");
  //   Serial.println(duration);
  //   Serial.println(distance);
  //   motor2.run(RELEASE);
  //   motor3.run(RELEASE);
  //   motor1.run(RELEASE);
  //   motor4.run(RELEASE);
  //   // 벽이 감지되면 로봇을 회전시키거나 다른 작업을 수행합니다.
  // } else {
  //   motor2.run(BACKWARD);
  //   motor3.run(BACKWARD);
  //   motor1.run(BACKWARD);
  //   motor4.run(BACKWARD);
  // }
  // delay(500); 
}