package com.example.detecto.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -2026937117L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath image = createString("image");

    public final ListPath<EMessage, QEMessage> messages = this.<EMessage, QEMessage>createList("messages", EMessage.class, QEMessage.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final ListPath<Objection, QObjection> objections = this.<Objection, QObjection>createList("objections", Objection.class, QObjection.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final ListPath<Report, QReport> reports = this.<Report, QReport>createList("reports", Report.class, QReport.class, PathInits.DIRECT2);

    public final StringPath sessionId = createString("sessionId");

    public final QTeam team;

    public final EnumPath<com.example.detecto.entity.enums.ThemeType> themeType = createEnum("themeType", com.example.detecto.entity.enums.ThemeType.class);

    public final StringPath token = createString("token");

    public final EnumPath<com.example.detecto.entity.enums.UserType> type = createEnum("type", com.example.detecto.entity.enums.UserType.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new QTeam(forProperty("team")) : null;
    }

}

