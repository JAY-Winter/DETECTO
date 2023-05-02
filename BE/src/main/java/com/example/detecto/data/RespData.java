package com.example.detecto.data;

//import com.example.demo.exception.ErrorEnum;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
public class RespData {
    boolean flag;
    Object data;

    @Builder
    public RespData(boolean flag, Object data) {
        this.flag = flag;
        this.data = data;
    }

    public ResponseEntity<?> get() {
        return new ResponseEntity<RespData>(this, HttpStatus.OK);
    }
}
