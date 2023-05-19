package com.example.detecto.service;

import com.example.detecto.dto.*;
import com.example.detecto.entity.Report;
import com.example.detecto.entity.Team;
import com.example.detecto.entity.User;
import com.example.detecto.entity.enums.UserType;
import com.example.detecto.exception.DatabaseFetchException;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.repository.ReportRepository;
import com.example.detecto.repository.TeamRepository;
import com.example.detecto.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    @Override
    public List<ReportSearchResponseDto> search(ReportSearchDto reportSearchDto) {

        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;
        Team t1 = teamRepository.findById(1).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
        Team t2 = teamRepository.findById(2).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
        Team t3 = teamRepository.findById(3).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

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

        if (reportSearchDto.getEquipments() != null && !reportSearchDto.getEquipments().isEmpty()) {
            whereClause.and(equipment.name.in(reportSearchDto.getEquipments()));
        }

        if(reportSearchDto.getId() != null){
            whereClause.and(user.id.eq(reportSearchDto.getId()));
        }

        List<Report> reports;
        try {
            reports = queryFactory
                .selectFrom(report)
                .leftJoin(report.user, user).fetchJoin()
              //  .leftJoin(user.team, team).fetchJoin()
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


        return reports.stream()
                .map(rd -> {
                    ReportSearchResponseUserDto rs_user = new ReportSearchResponseUserDto(rd.getUser());

                    int hour = rd.getTime().getHour();
                    Team t = null;
                    if(hour >= 6 && hour < 14){
                        t = t1;
                    }else if(hour >= 14 && hour < 22){
                        t = t2;
                    }else{
                        t = t3;
                    }

                    ReportSearchResponseTeamDto rs_team = new ReportSearchResponseTeamDto(t);

                    List<String> equipmentNames = rd.getReportItems().stream()
                            .map(item -> item.getEquipment().getName())
                            .collect(Collectors.toList());

                    return new ReportSearchResponseDto(rd.getId(), rd.getTime(), rd.getX(), rd.getY(), rd.getCctvArea(),
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
    public ReportCountResponseDto count(int id) {
        User userinfo = userRepository.findById(id).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

        ReportCountResponseDto responseDto = new ReportCountResponseDto();
        LocalDateTime now = LocalDateTime.now();

        int day, week, month;
        if(userinfo.getType() == UserType.ADMIN){
            day = reportRepository.countTimeInRange(now.minusDays(1), now);
            week = reportRepository.countTimeInRange(now.minusWeeks(1), now);
            month = reportRepository.countTimeInRange(now.minusMonths(1),now);
        }else{
            day = reportRepository.countTimeInRangeId(id, now.minusDays(1), now);
            week = reportRepository.countTimeInRangeId(id, now.minusWeeks(1), now);
            month = reportRepository.countTimeInRangeId(id, now.minusMonths(1),now);
        }

        responseDto.setDay(day);
        responseDto.setWeek(week);
        responseDto.setMonth(month);

        return responseDto;
    }

    @Override
    public void edit(ReportEditDto reportEditDto) {
        Report r = reportRepository.findById(reportEditDto.getReportId()).orElseThrow(() -> new DoesNotExistData("Report : 아이디가 존재하지 않습니다."));
        User userinfo = userRepository.findById(reportEditDto.getUserId()).orElseThrow(() -> new DoesNotExistData("User : 아이디가 존재하지 않습니다."));

        r.setUser(userinfo);
        reportRepository.save(r);
    }

    @Override
    public void deleteReport(int id) {
        Report r = reportRepository.findById(id).orElseThrow(() -> new DoesNotExistData("Report : 아이디가 존재하지 않습니다."));

        reportRepository.delete(r);
    }
}
