package com.example.detecto.service;

import com.example.detecto.dto.*;
import com.example.detecto.entity.Report;
import com.example.detecto.entity.enums.ReportStatus;
import com.example.detecto.exception.DatabaseFetchException;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.exception.ObjectionException;
import com.example.detecto.repository.ReportRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.detecto.entity.QReport.*;
import static com.example.detecto.entity.QReportItem.*;
import static com.example.detecto.entity.QEquipment.*;
import static com.example.detecto.entity.QTeam.*;
import static com.example.detecto.entity.QUser.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final JPAQueryFactory queryFactory;
    private final ReportRepository reportRepository;

    @Override
    public List<ReportSearchResponseDto> search(ReportSearchDto reportSearchDto) {

        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;

        if (reportSearchDto.getStartDate() != null) {
            LocalDate receivedDate = reportSearchDto.getStartDate();
            startDateTime = receivedDate.atTime(LocalTime.of(00, 00)); // 날짜에 원하는 시간을 추가 (예: 00시 00분)
        }
        if (reportSearchDto.getEndDate() != null) {
            LocalDate receivedDate = reportSearchDto.getEndDate();
            endDateTime = receivedDate.atTime(LocalTime.of(23, 59)); // 날짜에 원하는 시간을 추가 (예: 23시 59분)
        }

        BooleanBuilder whereClause = new BooleanBuilder();

        if (startDateTime != null && endDateTime != null) {
            whereClause.and(report.time.between(startDateTime, endDateTime));
        }

        if (!reportSearchDto.getEquipments().isEmpty()) {
            whereClause.and(equipment.name.in(reportSearchDto.getEquipments()));
        }

        if(reportSearchDto.getStatus() != null){
            whereClause.and(report.reportStatus.eq(reportSearchDto.getStatus()));
        }

        if(reportSearchDto.getUserId() != null){
            whereClause.and(user.id.eq(reportSearchDto.getUserId()));
        }

        List<Report> reports;
        try {
            reports = queryFactory
                .selectFrom(report)
                .leftJoin(report.user, user).fetchJoin()
                .leftJoin(user.team, team).fetchJoin()
                .leftJoin(report.reportItems, reportItem).fetchJoin()
                .leftJoin(reportItem.equipment, equipment).fetchJoin()
                .where(whereClause)
                .distinct()
                .fetch();
        } catch (PersistenceException e) {
            // JPA 관련 예외 처리
            log.error("Error while fetching reports: ", e);
            throw new DatabaseFetchException("reports fetch 중 에러가 발생하였습니다.");
        } catch (Exception e) {
            // 기타 예외 처리
            log.error("Unexpected error while fetching reports: ", e);
            throw new DatabaseFetchException("reports fetch 중 예기치 못한 에러가 발생하였습니다.");
        }

        for (Report report1 : reports) {
            System.out.println(report1);
        }

        return reports.stream()
                .map(rd -> {
                    ReportSearchResponseUserDto rs_user = new ReportSearchResponseUserDto(rd.getUser());
                    ReportSearchResponseTeamDto rs_team = new ReportSearchResponseTeamDto(rd.getUser().getTeam());

                    List<String> equipmentNames = rd.getReportItems().stream()
                            .map(item -> item.getEquipment().getName())
                            .collect(Collectors.toList());

                    return new ReportSearchResponseDto(rd.getId(), rd.getTime(), rd.getX(), rd.getY(), rd.getCctvArea(), rd.getReportStatus(),
                            rs_user, rs_team, equipmentNames);
                })
                .collect(Collectors.toList());
    }

    @Override
    public void coord(ReportCoordDto reportCoordDto) {
        Report r = reportRepository.findById(reportCoordDto.getId()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
        r.setCoord(reportCoordDto);

        reportRepository.save(r);
    }

    @Override
    public void objection(ObjectionDto objectionDto) {
        Report r = reportRepository.findById(objectionDto.getId()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

        if(r.getReportStatus() == ReportStatus.REJECTED){
            throw new ObjectionException("이미 거절된 상태입니다.");
        }


    }
}
