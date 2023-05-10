package com.example.detecto.exception.handler;

import com.example.detecto.data.RespData;
import com.example.detecto.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.rmi.AlreadyBoundException;
import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ControllerExceptionHandler {

//    @ExceptionHandler(SQLException.class)
//    public ResponseEntity<?> SqlException(SQLException ex) {
//        RespData<Void> data = new RespData(ErrorEnum.SQL_ERROR);
//        if (ex instanceof SQLSyntaxErrorException) {
//            data = new RespData(ErrorEnum.SQL_SYNTAX_ERROR);
//        }
//        return data.builder();
//    }
//
//    @ExceptionHandler(CustomJwtException.class)
//    public ResponseEntity<?> JwtException() {
//        RespData<Void> data = new RespData(ErrorEnum.JWT_ERROR);
//        return data.builder();
//    }
//
//    @ExceptionHandler(NoUserDataException.class)
//    public ResponseEntity<?> NoObjectDataException() {
//        RespData<Void> data = new RespData(ErrorEnum.NO_USER_ERROR);
//        data.setData(null);
//        return data.builder();
//    }

    @ExceptionHandler(DoesNotExistData.class)
    public void doesNotExistData(Exception e) {
        createErrorResponse(ErrorEnum.DOES_NOT_EXIST_DATA_ERROR, e);
    }

    @ExceptionHandler(AlreadyExistData.class)
    public void alreadyBoundException(Exception e) {
        createErrorResponse(ErrorEnum.ALREADY_EXIST_DATA_ERROR, e);
    }

    @ExceptionHandler(DoesNotExistServer.class)
    public void doesNotExistServer(Exception e){
        createErrorResponse(ErrorEnum.DOES_NOT_EXIST_SERVER_ERROR, e);
    }

    @ExceptionHandler(InvalidData.class)
    public void invalidData(Exception e){
        createErrorResponse(ErrorEnum.INVALID_DATA_ERROR, e);
    }

    @ExceptionHandler(DatabaseFetchException.class)
    public void databaseFetchException(Exception e){
        createErrorResponse(ErrorEnum.FETCH_EXCEPTION_ERROR, e);
    }

    @ExceptionHandler(AuthFailException.class)
    public void authFailException(Exception e){
        createErrorResponse(ErrorEnum.AUTH_FAIL_ERROR, e);
    }


    private ResponseEntity<?> createErrorResponse(ErrorEnum errorEnum, Exception e) {
//        Map<String, String> map = new HashMap<>();
//        log.error("error ", e.getClass().getName());
//
//        map.put("errName", e.getClass().getName());
//        map.put("errMessage", e.toString());
//
//        RespData<Map> resData = RespData.builder()
//                .flag(true)
//                .data(map)
//                .build();
        RespData<Void> data = new RespData(errorEnum);
        data.setMsg(e.getMessage());
        return data.exceptionBuilder();
    }
}
