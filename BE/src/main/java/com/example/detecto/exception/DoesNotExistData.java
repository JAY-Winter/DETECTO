package com.example.detecto.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DoesNotExistData extends RuntimeException{
    public DoesNotExistData(String message) {
        super(message);
    }
}
