package com.example.detecto.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    private Report report;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_name")
    private Equipment equipment;

    public void setReport(Report report){
        if(report.getReportItems().contains(this)){
            report.getReportItems().remove(this);
        }

        this.report = report;
        report.getReportItems().add(this);
    }

    public void setEquipment(Equipment equipment){
        this.equipment = equipment;
    }
}
