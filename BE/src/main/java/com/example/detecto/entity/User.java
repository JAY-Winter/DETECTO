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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_team")
    private Team team;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Report> reports = new ArrayList<>();

    @Builder
    public User(int id, String password, String userName, String userImage){
        this.id = id;
        this.password = password;
        this.userName = userName;
        this.userImage = userImage;
    }

    public void setTeam(Team team){
        if(team.getUsers().contains(this)){
            team.getUsers().remove(this);
        }

        this.team = team;
        team.getUsers().add(this);
    }

}
