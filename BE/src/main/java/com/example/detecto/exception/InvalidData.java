package com.example.detecto.exception;

public class InvalidData extends RuntimeException{
    public InvalidData(String message) {
        super(message);
    }
}
