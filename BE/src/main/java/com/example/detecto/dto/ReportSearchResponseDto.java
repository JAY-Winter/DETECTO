package com.example.detecto.dto;

import lombok.Data;


import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReportSearchResponseDto {
    private int id;
    private LocalDateTime time;
    private int x;
    private int y;
    private int cctvArea;
    private ReportSearchResponseUserDto user;
    private ReportSearchResponseTeamDto team;
    private List<String> reportItems;

    public ReportSearchResponseDto(int id, LocalDateTime time, int x, int y,int cctvArea, ReportSearchResponseUserDto user, ReportSearchResponseTeamDto team, List<String> reportItems){
        this.id = id;
        this.time = time;
        this.x = x;
        this.y = y;
        this.cctvArea = cctvArea;
        this.user = user;
        this.team = team;
        this.reportItems = reportItems;
    }
}
