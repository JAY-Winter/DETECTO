import { useState } from 'react';
import styled from '@emotion/styled';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';
import { TeamType, ReportUserType, ReportType } from 'ReportTypes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';
import { EquipmentsAtom } from '@/store/EquipmentStore';
import { Button } from '@mui/material';
import axios from 'axios';
import { HistoryIssue } from '@/store/HistoryIssue';

type TableCollapseCardPropsType = {
  x: number;
  y: number;
  reportid: number;
  area: number;
  teamList: TeamType;
  violate_member: ReportUserType;
  report: ReportType;
};

function TableCollapseCard({
  x,
  y,
  reportid,
  area,
  teamList,
  violate_member,
  report,
}: TableCollapseCardPropsType) {
  const userInfo = useRecoilValue(UserInfo);
  const equipmentList = useRecoilValue(EquipmentsAtom);
  const [reportList, setReportList] = useRecoilState(HistoryIssue);

  const removeHandler = () => {
    const remove = window.confirm('정말 리포트를 삭제 하시겠습니까?');
    if (remove) {
      axios({
        method: 'delete',
        url: `https://detecto.kr/api/report/${reportid}`,
      })
        .then(res =>
          setReportList(prev => prev.filter(report => report.id !== reportid))
        )
        .catch(err => console.log(err));
    }
  };

  return (
    <TableCollapseDiv>
      <LineStyle>
        <CollapseImageCardDiv>
          <IssueImage reportid={reportid.toString()} />
        </CollapseImageCardDiv>
        <div>
          <CollapseCardDiv>
            <h2>위반 내역</h2>
            <CollapseCardContents>
              <h4>위반 일시</h4>
              <p>{timeFormatter(report.time)}</p>
              <h4>위반 사항</h4>
              <p>
                {stringListFormatter(
                  report.reportItems.map(item => {
                    if (equipmentList) {
                      const foundItem = equipmentList.find(
                        eq => eq.name === item
                      );
                      return foundItem ? foundItem.description : '';
                    } else return '';
                  })
                )}
              </p>
              {/* <h4>위반자</h4>
              <p>
                {report.user.name} ({report.team.teamName})
              </p> */}
              <h4>위반 지역</h4>
              <p>{report.cctvArea + 1}번 구역</p>
            </CollapseCardContents>
          </CollapseCardDiv>
          <CollapseCardDiv>
            <MemberCard
              teamList={teamList}
              violate_member={violate_member}
              reportId={reportid}
            />
          </CollapseCardDiv>
        </div>
      </LineStyle>
      <LineStyle className="button-wrapper">
        <Button onClick={removeHandler}>위반 내역 삭제</Button>
      </LineStyle>
    </TableCollapseDiv>
  );
}

export default TableCollapseCard;

const TableCollapseDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 10px;
  margin: 1rem 0;
`;

const LineStyle = styled.div`
  width: 100%;
  display: flex;

  > div {
    width: 100%;
    flex-basis: 50%;
    margin-right: 0.5rem;
    :nth-last-of-type(1) {
      margin-right: 0;
    }
  }

  &.button-wrapper {
    justify-content: flex-end;
    margin-top: 0.5rem;
    button {
      color: ${props => props.theme.palette.error.main};
    }
  }
`;

const CollapseImageCardDiv = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${props => props.theme.palette.neutral.main};
  border-radius: 10px;
`;

const CollapseCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${props => props.theme.palette.neutral.main};
  border-radius: 10px;
  margin-bottom: 0.5rem;
  :nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;

const CollapseCardContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
  padding: 0.6rem 1rem 0 1rem;

  > p {
    margin-bottom: 0.5rem;
    /* border-bottom: 1px solid ${props => props.theme.palette.neutral.card}; */
  }
`;
