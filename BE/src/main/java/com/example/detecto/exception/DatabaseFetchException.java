package com.example.detecto.exception;

public class DatabaseFetchException extends RuntimeException{
    public DatabaseFetchException(String message) {
        super(message);
    }
}
