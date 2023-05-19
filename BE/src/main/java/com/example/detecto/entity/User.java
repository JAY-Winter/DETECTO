package com.example.detecto.entity;

import com.example.detecto.entity.enums.ThemeType;
import com.example.detecto.entity.enums.UserType;
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
    @Column(name = "name")
    private String name;
    @Column(name = "image")
    private String image;

    @Column(name = "token", length = 500)
    private String token;

    @Column(name = "session_id")
    private String sessionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private UserType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private ThemeType themeType;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team")
    private Team team;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Report> reports = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<EMessage> messages = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Objection> objections = new ArrayList<>();

    @Builder
    public User(int id, String password, String name, String image, String token, String sessionId, UserType type, ThemeType themeType){
        this.id = id;
        this.password = password;
        this.name = name;
        this.image = image;
        this.token = token;
        this.type = type;
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

    public void setToken(String token){
        this.token = token;
    }

    public void setSessionId(String sessionId){
        this.sessionId = sessionId;
    }

    public void setThemeType(ThemeType themeType){this.themeType = themeType; }

}
