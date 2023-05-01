package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"userNumber", "password", "userImage"})
public class Users {

    @Id
    @Column(name = "user_number")
    private String userNumber;

    private String password;

    private String userImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Teams team;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Reports> reports = new ArrayList<>();

    @Builder
    public Users(String userNumber, String password, String userImage){
        this.userNumber = userNumber;
        this.password = password;
        this.userImage = userImage;
    }

    public void setTeam(Teams team){
        if(team.getUsers().contains(this)){
            team.getUsers().remove(this);
        }

        this.team = team;
        team.getUsers().add(this);
    }

}
