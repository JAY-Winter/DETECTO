package com.example.detecto.service;

import com.example.detecto.dto.UserDto;
import com.example.detecto.dto.UserTokenDto;
import com.example.detecto.entity.User;

public interface UserService{
    User login(UserDto userDto);

    void save(User user);

    void delete(UserDto userDto);

    void themeEdit(int id);

    void token(UserTokenDto userTokenDto);
}
