package com.example.detecto.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEquipment is a Querydsl query type for Equipment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEquipment extends EntityPathBase<Equipment> {

    private static final long serialVersionUID = -142124170L;

    public static final QEquipment equipment = new QEquipment("equipment");

    public final NumberPath<Integer> able = createNumber("able", Integer.class);

    public final StringPath description = createString("description");

    public final StringPath name = createString("name");

    public final NumberPath<Integer> training = createNumber("training", Integer.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final StringPath url = createString("url");

    public QEquipment(String variable) {
        super(Equipment.class, forVariable(variable));
    }

    public QEquipment(Path<? extends Equipment> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEquipment(PathMetadata metadata) {
        super(Equipment.class, metadata);
    }

}

