package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@ToString(of ={"reportItemId", "item"})
public class ReportsItems {
    @Id
    @GeneratedValue
    @Column(name = "report_item_id")
    private int reportItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id")
    private Reports report;

    private int item;

    @Builder
    public ReportsItems(int item){
        this.item = item;
    }


    public void setReport(Reports report){
        if(report.getReportsItems().contains(this)){
            report.getReportsItems().remove(this);
        }

        this.report = report;
        report.getReportsItems().add(this);
    }
}
