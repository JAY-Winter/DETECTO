package com.example.detecto.dto;


import com.example.detecto.entity.User;
import lombok.Data;

@Data
public class ReportSearchResponseUserDto {
    private int id;

    private String userName;

    private String userImage;

    public ReportSearchResponseUserDto(User user){
        this.id = user.getId();
        this.userName = user.getUserName();
        this.userImage = user.getUserImage();
    }

}
