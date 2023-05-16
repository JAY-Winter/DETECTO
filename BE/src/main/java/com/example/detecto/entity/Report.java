package com.example.detecto.entity;

import com.example.detecto.dto.ReportCoordDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"id", "c", "x", "y", "cctvArea", "time"})
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private int x;

    private int y;

    // cctv 구역 int로
    @Column(name = "cctv_area")
    private int cctvArea;

//    @Enumerated(EnumType.STRING)
//    @Column(name="report_status")
//    private ReportStatus reportStatus;

    private LocalDateTime time;


    @JsonIgnore
    @OneToMany(mappedBy = "report", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ReportItem> reportItems = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "report", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Objection> objections = new ArrayList<>();

    @Builder
    public Report(int x, int y, int cctvArea){
        this.x = x;
        this.y = y;
        this.time = LocalDateTime.now();
        this.cctvArea = cctvArea;
    }

    public void setUser(User user){
        if(user.getReports().contains(this)){
            user.getReports().remove(this);
        }

        this.user = user;
        user.getReports().add(this);
    }

    public void setCoord(ReportCoordDto reportCoordDto){
        this.x = reportCoordDto.getX();
        this.y = reportCoordDto.getY();
    }
}



