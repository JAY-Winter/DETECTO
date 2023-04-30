package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"reportId", "time"})
public class Reports {

    @Id
    @GeneratedValue
    @Column(name = "report_id")
    private int reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_number")
    private Users user;

    private LocalDateTime time;

    private String url;

    @JsonIgnore
    @OneToMany(mappedBy = "report", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ReportsItems> reportsItems = new ArrayList<>();

    @Builder
    public Reports(String url){
        this.url = url;
        this.time = LocalDateTime.now();
    }

    public void setUser(Users user){
        if(user.getReports().contains(this)){
            user.getReports().remove(this);
        }

        this.user = user;
        user.getReports().add(this);
    }
}
