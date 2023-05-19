package com.example.detecto.dto;


import com.example.detecto.entity.User;
import com.example.detecto.entity.enums.UserType;
import lombok.Data;

@Data
public class ReportSearchResponseUserDto {
    private int id;

    private String name;

    private String image;

    private UserType type;

    public ReportSearchResponseUserDto(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.image = user.getImage();
        this.type = user.getType();
    }

}
