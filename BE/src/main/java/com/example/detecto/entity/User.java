package com.example.detecto.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"id", "password", "userImage"})
public class User {

    @Id
    @Column(name = "id")
    private int id;

    private String password;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_image")
    private String userImage;

    @Column(name = "fcm_token")
    private String fcmToken;

    @Column(name = "session_id")
    private String sessionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private UserType userType;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_theme")
    private ThemeType themeType;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_team")
    private Team team;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Report> reports = new ArrayList<>();

    @Builder
    public User(int id, String password, String userName, String userImage, String fcmToken, String sessionId, UserType userType, ThemeType themeType){
        this.id = id;
        this.password = password;
        this.userName = userName;
        this.userImage = userImage;
        this.fcmToken = fcmToken;
        this.userType = userType;
        this.themeType = themeType;
        this.sessionId = sessionId;
    }

    public void setTeam(Team team){
        if(team.getUsers().contains(this)){
            team.getUsers().remove(this);
        }

        this.team = team;
        team.getUsers().add(this);
    }

    public void setFcmToken(String fcmToken){
        this.fcmToken = fcmToken;
    }

    public void setSessionId(String sessionId){
        this.sessionId = sessionId;
    }

}
