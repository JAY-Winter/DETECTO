package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"teamId", "teamName"})
public class Teams {
    @Id
    @GeneratedValue
    @Column(name = "team_id")
    private int teamId;

    @Column(name = "team_name")
    private String teamName;

    @JsonIgnore
    @OneToMany(mappedBy = "team", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Users> users = new ArrayList<>();

    @Builder
    public Teams(String teamName){
        this.teamName = teamName;
    }
}
