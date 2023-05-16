package com.example.detecto.dto;

import com.example.detecto.entity.Objection;
import com.example.detecto.entity.enums.ObjectionStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ObjectionResponseDto {

    private int id;

    private String comment;

    private String adminComment;

    private ObjectionStatus status;

    private String name;

    private int reportId;

    private ReportSearchResponseTeamDto team;

    private LocalDateTime createdAt;


    public ObjectionResponseDto(Objection objection){
        this.id = objection.getId();
        this.comment = objection.getComment();
        this.adminComment = objection.getAdminComment();
        this.status = objection.getStatus();
        this.name = objection.getUser().getName();
        this.reportId = objection.getReport().getId();
        this.team = new ReportSearchResponseTeamDto(objection.getUser().getTeam());
        this.createdAt = objection.getCreatedAt();
    }
}
