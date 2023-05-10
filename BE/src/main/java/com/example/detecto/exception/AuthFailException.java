package com.example.detecto.exception;

public class AuthFailException extends RuntimeException{
    public AuthFailException(String message) {
        super(message);
    }
}
