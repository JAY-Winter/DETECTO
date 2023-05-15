package com.example.detecto.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QObjection is a Querydsl query type for Objection
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QObjection extends EntityPathBase<Objection> {

    private static final long serialVersionUID = 1586900561L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QObjection objection = new QObjection("objection");

    public final StringPath adminComment = createString("adminComment");

    public final StringPath comment = createString("comment");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QReport report;

    public final EnumPath<com.example.detecto.entity.enums.ObjectionStatus> status = createEnum("status", com.example.detecto.entity.enums.ObjectionStatus.class);

    public final QUser user;

    public QObjection(String variable) {
        this(Objection.class, forVariable(variable), INITS);
    }

    public QObjection(Path<? extends Objection> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QObjection(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QObjection(PathMetadata metadata, PathInits inits) {
        this(Objection.class, metadata, inits);
    }

    public QObjection(Class<? extends Objection> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.report = inits.isInitialized("report") ? new QReport(forProperty("report"), inits.get("report")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

