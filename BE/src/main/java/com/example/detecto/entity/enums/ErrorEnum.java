package com.example.detecto.entity.enums;

public enum ErrorEnum {

    ALREADY_EXIST_DATA_ERROR("fail","데이터가 이미 있습니다." , 0),
    DOES_NOT_EXIST_DATA_ERROR("fail","데이터가 존재하지 않습니다." , 0),
    DOES_NOT_EXIST_SERVER_ERROR("fail","서버가 존재하지 않습니다." , 0),
    FETCH_EXCEPTION_ERROR("fail","데이터베이스 fetch 과정에서 오류가 발생했습니다." , 1),
    AUTH_FAIL_ERROR("fail","인증이 실패했습니다." , 0),
    OBJECTION_ERROR("fail","이의제기가 거절된 상태입니다." , 0),
    MESSAGE_ERROR("fail","message 에러 발생했습니다." , 0),
    INVALID_DATA_ERROR("fail","유효한 데이터가 아닙니다." , 0);

    public String flag;
    public String msg;
    public int code;


    ErrorEnum(String flag, String msg, int code) {
        this.flag = flag;
        this.msg = msg;
        this.code = code;
    }
}
