package com.example.detecto.exception;

public class DoesNotExistServer extends RuntimeException{
    public DoesNotExistServer(String message) {
        super(message);
    }
}
