package com.example.detecto.service;

import com.example.detecto.dto.ObjectionAdminCommentDto;
import com.example.detecto.dto.ObjectionDto;
import com.example.detecto.entity.Objection;

import java.util.List;

public interface ObjectionService {
    List<Objection> getObjectionList();
    List<Objection> getObjectionList(int id);
    void postObjection(ObjectionDto objectionDto);
    void postAdminComment(ObjectionAdminCommentDto objectionAdminCommentDto);
    void deleteObjection(int id);
}
