package com.example.demo.user.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users") // 테이블 이름을 "users"로 설정
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String number;
    private String password;
    // Getter 메서드 추가
    public String getNumber() {
        return number;
    }


    public String getPassword() {
        return password;
    }

    // Setter 메서드 추가
    public void setNumber(String userNumber) {
        this.number = userNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
