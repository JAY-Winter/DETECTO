import { useState } from 'react';
import styled from '@emotion/styled';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';
import { TeamType, ReportUserType, ReportType } from 'ReportTypes';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';
import RaiseIssueButton from '@components/RaiseIssue/RaiseIssueButton';
import { EquipmentsAtom } from '@/store/EquipmentStore';

type TableCollapseCardPropsType = {
  x: number;
  y: number;
  reportid: number;
  area: number;
  teamList: TeamType;
  violate_member?: ReportUserType;
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

  return (
    <TableCollapseDiv>
      <CollapseImageCardDiv>
        <IssueImage reportid={reportid.toString()} />
      </CollapseImageCardDiv>
      <CollapseContentDiv>
        <CollapseCardDiv>
          <h2>위반 내역</h2>
          <CollapseCardContents>
            <div>
              <h3>위반 일시</h3>
              <p>{timeFormatter(report.time)}</p>
              <h3>소속 팀</h3>
              <p>{report.team.teamName}</p>
              <h3>위반 사항</h3>
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
            </div>
            <div>
              <h3>위반자</h3>
              <p>{report.user.name}</p>
              <h3>위반 지역</h3>
              <p>{report.cctvArea}번 구역</p>
            </div>
          </CollapseCardContents>
        </CollapseCardDiv>
        <CollapseCardDiv>
          <MemberCard
            teamList={teamList}
            violate_member={violate_member}
            reportId={reportid}
          />
        </CollapseCardDiv>
      </CollapseContentDiv>
      {/* <div
        style={{
          width: '50%',
        }}
      >
        <IssueWorkerImage reportid={reportid.toString()} />
      </div> */}
    </TableCollapseDiv>
  );
}

export default TableCollapseCard;

const TableCollapseDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch; // 아이템들이 컨테이너 높이를 채우도록 설정
  position: relative;
  width: 100%;
  height: auto;
  padding: 1rem;
  background-color: ${props => props.theme.palette.neutral.cardHover};
  border-radius: 10px;

  > div {
    width: 100%;
  }
`;

const CollapseImageCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;

  flex-basis: calc(50% - 2rem);

  background-color: ${props => props.theme.palette.neutral.main};

  border-radius: 1rem;
`;

const CollapseContentDiv = styled.div`
  flex-basis: calc(50% - 2rem);
`;

// width를 일정 수치 안주면 resize가 정상작동을 하지 않습니다
const CollapseCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;

  background-color: ${props => props.theme.palette.neutral.main};

  border-radius: 1rem;
`;

const CollapseCardContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  text-align: start;
  padding: 1rem;

  > div {
    width: 30%;
  }
`;
