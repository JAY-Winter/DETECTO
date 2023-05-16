package com.example.detecto.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = 1930094668L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReport report = new QReport("report");

    public final NumberPath<Integer> cctvArea = createNumber("cctvArea", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final ListPath<Objection, QObjection> objections = this.<Objection, QObjection>createList("objections", Objection.class, QObjection.class, PathInits.DIRECT2);

    public final ListPath<ReportItem, QReportItem> reportItems = this.<ReportItem, QReportItem>createList("reportItems", ReportItem.class, QReportItem.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public final QUser user;

    public final NumberPath<Integer> x = createNumber("x", Integer.class);

    public final NumberPath<Integer> y = createNumber("y", Integer.class);

    public QReport(String variable) {
        this(Report.class, forVariable(variable), INITS);
    }

    public QReport(Path<? extends Report> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReport(PathMetadata metadata, PathInits inits) {
        this(Report.class, metadata, inits);
    }

    public QReport(Class<? extends Report> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

