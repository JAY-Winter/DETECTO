package com.example.detecto.dto;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    private String password;
    private String fcmToken;
}
