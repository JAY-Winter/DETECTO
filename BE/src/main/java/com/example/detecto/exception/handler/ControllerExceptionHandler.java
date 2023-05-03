package com.example.detecto.exception.handler;

import com.example.detecto.data.RespData;
import com.example.detecto.exception.DoesNotExistData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.rmi.AlreadyBoundException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(DoesNotExistData.class)
    public ResponseEntity<?> doesNotExistData(Exception e) {
        return createErrorResponse(e, HttpStatus.NOT_FOUND); // 404
    }

    @ExceptionHandler(AlreadyBoundException.class)
    public ResponseEntity<?> alreadyBoundException(Exception e) {
        return createErrorResponse(e, HttpStatus.NOT_FOUND); // 409
    }


    private ResponseEntity<RespData> createErrorResponse(Exception e, HttpStatus status) {
        Map<String, String> map = new HashMap<>();
        log.error("error ", e.getClass().getName());

        map.put("errName", e.getClass().getName());
        map.put("errMessage", e.toString());

        RespData resData = RespData.builder()
                .flag(true)
                .data(map)
                .build();

        return new ResponseEntity<>(resData, status);
    }
}
