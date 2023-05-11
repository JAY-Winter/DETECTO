package com.example.detecto.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"name"})
public class Equipment {

    @Id
    @Column(name = "name")
    private String name;

    // 이미지 URL  이름 : url String
    private String url;

    // 설명 이름 :description String
    private String description;

    // type int  보호구 1번 보호구 아니면 0
    private int type;

    // able int 디텍팅 할거면 1번 디텍팅 안할거면 0번
    private int able;

    // training int 1이면 학습 됨 0이면 학습 중
    private int training;

    @Builder
    public Equipment(String name, String url, String description, int type, int able, int training){
        this.name = name;
        this.url = url;
        this.description = description;
        this.type = type;
        this.able = able;
        this.training = training;
    }

    public void setDescription(String description) { this.description = description; }

    public void setAble(int able){
        this.able = able;
    }

    public void setUrl(String url) {this.url = url;}
}
