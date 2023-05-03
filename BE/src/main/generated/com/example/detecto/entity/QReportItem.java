package com.example.detecto.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReportItem is a Querydsl query type for ReportItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReportItem extends EntityPathBase<ReportItem> {

    private static final long serialVersionUID = -1482108545L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReportItem reportItem = new QReportItem("reportItem");

    public final QEquipment equipment;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QReport report;

    public QReportItem(String variable) {
        this(ReportItem.class, forVariable(variable), INITS);
    }

    public QReportItem(Path<? extends ReportItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReportItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReportItem(PathMetadata metadata, PathInits inits) {
        this(ReportItem.class, metadata, inits);
    }

    public QReportItem(Class<? extends ReportItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.equipment = inits.isInitialized("equipment") ? new QEquipment(forProperty("equipment")) : null;
        this.report = inits.isInitialized("report") ? new QReport(forProperty("report"), inits.get("report")) : null;
    }

}

