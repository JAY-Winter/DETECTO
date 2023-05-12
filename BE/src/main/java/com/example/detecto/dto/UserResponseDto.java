package com.example.detecto.dto;

import com.example.detecto.entity.ThemeType;
import com.example.detecto.entity.User;
import com.example.detecto.entity.UserType;
import lombok.Data;

//id?: number,
//name?: string,
//division?: string
//img?: string,
//theme?: 'light' | 'dark',
//type: 'worker' | 'admin'

@Data
public class UserResponseDto {
    private int id;
    private String name;
    private String division;
    private String img;
    private UserType type;
    private ThemeType theme;

    public UserResponseDto(User user){
        this.id = user.getId();
        this.name = user.getUserName();
        this.division = user.getTeam().getTeamName();
        this.img = user.getUserImage();
        this.type = user.getUserType();
        this.theme = user.getThemeType();
    }
}
