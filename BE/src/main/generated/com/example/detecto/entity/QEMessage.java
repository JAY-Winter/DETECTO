package com.example.detecto.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEMessage is a Querydsl query type for EMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEMessage extends EntityPathBase<EMessage> {

    private static final long serialVersionUID = -1923057414L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEMessage eMessage = new QEMessage("eMessage");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath message = createString("message");

    public final StringPath title = createString("title");

    public final QUser user;

    public QEMessage(String variable) {
        this(EMessage.class, forVariable(variable), INITS);
    }

    public QEMessage(Path<? extends EMessage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEMessage(PathMetadata metadata, PathInits inits) {
        this(EMessage.class, metadata, inits);
    }

    public QEMessage(Class<? extends EMessage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

