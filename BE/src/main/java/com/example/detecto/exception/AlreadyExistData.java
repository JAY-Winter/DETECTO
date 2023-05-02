package com.example.detecto.exception;

public class AlreadyExistData extends RuntimeException{
    public AlreadyExistData(String message) {
        super(message);
    }
}
