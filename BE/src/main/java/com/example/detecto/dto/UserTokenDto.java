package com.example.detecto.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserTokenDto {
    private int id;
    @NotNull
    private String endpoint;
    @NotNull
    private String p256dh;
    @NotNull
    private String auth;
}
