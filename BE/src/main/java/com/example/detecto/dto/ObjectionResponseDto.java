package com.example.detecto.dto;

import com.example.detecto.entity.Objection;
import com.example.detecto.entity.Report;
import com.example.detecto.entity.User;
import com.example.detecto.entity.enums.ObjectionStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ObjectionResponseDto {

    private int id;

    private String comment;

    private String adminComment;

    private ObjectionStatus type;

    private String name;

    private String img;

    private LocalDateTime createdAt;


    public ObjectionResponseDto(Objection objection){
        this.id = objection.getId();
        this.comment = objection.getComment();
        this.adminComment = objection.getAdminComment();
        this.type = objection.getType();
        this.name = objection.getUser().getName();
        this.img = objection.getUser().getImage();
        this.createdAt = objection.getCreatedAt();
    }
}
