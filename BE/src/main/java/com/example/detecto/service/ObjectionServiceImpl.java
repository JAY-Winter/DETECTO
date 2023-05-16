package com.example.detecto.service;


import com.example.detecto.dto.ObjectionAdminCommentDto;
import com.example.detecto.dto.ObjectionDto;
import com.example.detecto.entity.Objection;
import com.example.detecto.entity.Report;
import com.example.detecto.entity.User;
import com.example.detecto.entity.enums.ObjectionStatus;
import com.example.detecto.entity.enums.ReportStatus;
import com.example.detecto.exception.DatabaseFetchException;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.repository.ObjectionRepository;
import com.example.detecto.repository.ReportRepository;
import com.example.detecto.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.PersistenceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.detecto.entity.QObjection.objection;
import static com.example.detecto.entity.QReport.report;
import static com.example.detecto.entity.QUser.user;

@Slf4j
@Service
@RequiredArgsConstructor
public class ObjectionServiceImpl implements ObjectionService{

    private final JPAQueryFactory queryFactory;
    private final ObjectionRepository objectionRepository;
    private final UserRepository userRepository;
    private final ReportRepository reportRepository;

    @Override
    public List<Objection> getObjectionList() {
        return objectionRepository.findAll();
    }

    @Override
    public List<Objection> getObjectionList(int id) {

        List<Objection> objections = null;
        try {
            objections = queryFactory
                    .selectFrom(objection)
                    .leftJoin(objection.user, user).fetchJoin()
                    .leftJoin(objection.report, report).fetchJoin()
                    .where(user.id.eq(id))
                    .distinct()
                    .fetch();
        } catch (PersistenceException e) {
            // JPA 관련 예외 처리
            log.error("Error while fetching objections: ", e);
            throw new DatabaseFetchException("objections fetch 중 에러가 발생하였습니다.");
        } catch (Exception e) {
            // 기타 예외 처리
            log.error("Unexpected error while fetching objections: ", e);
            throw new DatabaseFetchException("objections fetch 중 예기치 못한 에러가 발생하였습니다.");
        }


        return objections;
    }

    @Override
    public void postObjection(ObjectionDto objectionDto) {
        Report r = reportRepository.findById(objectionDto.getReportId()).orElseThrow(() -> new DoesNotExistData("Report : 아이디가 존재하지 않습니다."));
        User u = userRepository.findById(objectionDto.getUserId()).orElseThrow(() -> new DoesNotExistData("User : 아이디가 존재하지 않습니다."));


        Objection obj = Objection.builder()
                .comment(objectionDto.getComment())
                .report(r)
                .user(u)
                .build();

        r.setReportStatus(ReportStatus.PENDING);
        reportRepository.save(r);
        objectionRepository.save(obj);
    }

    @Override
    public void postAdminComment(ObjectionAdminCommentDto objectionAdminCommentDto) {
        Objection obj = objectionRepository.findById(objectionAdminCommentDto.getId()).orElseThrow(() -> new DoesNotExistData("Report : 아이디가 존재하지 않습니다."));

        obj.setAdminComment(objectionAdminCommentDto.getComment());
        obj.setType(ObjectionStatus.APPLIED);
    }
}
