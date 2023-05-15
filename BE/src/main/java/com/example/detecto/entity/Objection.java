package com.example.detecto.entity;

import com.example.detecto.entity.enums.ObjectionStatus;
import com.example.detecto.entity.enums.ReportStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@ToString(of ={"name", "comment", "adminComment", "type", "user", "report", "createdAt"})
public class Objection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private String comment;

    @Column(name = "admin_comment")
    private String adminComment;

    @Enumerated(EnumType.STRING)
    private ObjectionStatus status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    private Report report;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Objection(String comment, String adminComment, User user, Report report){
        this.comment = comment;
        this.adminComment = adminComment;
        this.status = ObjectionStatus.PENDING;
        this.user = user;
        this.report = report;
        this.createdAt = LocalDateTime.now();
    }

    public void setAdminComment(String adminComment) {
        this.adminComment = adminComment;
    }

    public void setType(ObjectionStatus status) {
        this.status = status;
    }
}
