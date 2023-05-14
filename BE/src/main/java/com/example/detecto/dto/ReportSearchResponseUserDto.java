package com.example.detecto.dto;


import com.example.detecto.entity.User;
import lombok.Data;

@Data
public class ReportSearchResponseUserDto {
    private int id;

    private String name;

    private String image;

    public ReportSearchResponseUserDto(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.image = user.getImage();
    }

}
