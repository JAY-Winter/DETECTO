package com.example.detecto.service;

import com.example.detecto.dto.UserDto;
import com.example.detecto.dto.UserTokenDto;
import com.example.detecto.entity.enums.ThemeType;
import com.example.detecto.entity.User;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;



@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User login(UserDto userDto) {
        return getUser(userDto);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void delete(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

        user.setSessionId(null);
        user.setToken(null);
        userRepository.save(user);
    }

    @Override
    public void themeEdit(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

        if(user.getThemeType() == ThemeType.DARK){
            user.setThemeType(ThemeType.LIGHT);
        }else{
            user.setThemeType(ThemeType.DARK);
        }

        userRepository.save(user);
    }

    @Override
    public void token(UserTokenDto userTokenDto) {
        User user = userRepository.findById(userTokenDto.getId()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

        String token = userTokenDto.getEndpoint() + ' ' + userTokenDto.getP256dh() + ' ' + userTokenDto.getAuth();

        user.setToken(token);
        userRepository.save(user);
    }

    private User getUser(UserDto userDto) {
        if(userDto.getId() == null){
            throw new DoesNotExistData("아이디를 입력해주세요.");
        }

        userRepository.findById(userDto.getId()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
        return userRepository.findByIdAndPassword(userDto.getId(), userDto.getPassword()).orElseThrow(() -> new DoesNotExistData("비밀번호가 틀렸습니다."));
    }
}
