package com.example.detecto.dto;

import com.example.detecto.entity.Team;
import lombok.Data;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ReportSearchResponseTeamDto {
    private int id;

    private String teamName;

    private List<ReportSearchResponseUserDto> users;

    public ReportSearchResponseTeamDto(Team team){
        this.id = team.getId();
        this.teamName = team.getTeamName();
        this.users = team.getUsers().stream().map(u -> new ReportSearchResponseUserDto(u))
                .collect(Collectors.toList());
    }
}
