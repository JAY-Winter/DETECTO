import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import IssueTable from '@components/RaiseIssue/IssueTable';
import styled from '@emotion/styled';

function IssuePage() {
  return (
    <IssueDiv>
      <IssueTitle>이의제기 목록</IssueTitle>
      <HistoryFilterWrapper>
        <HistoryDatePicker />
        <HistoryEquipmentFilter />
      </HistoryFilterWrapper>
      <IssueTable />
    </IssueDiv>
  );
}

const IssueDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${mobileV} {
    align-items: normal;
  }
`;

const IssueTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const HistoryFilterWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  ${mobileV} {
    flex-direction: column;
  }
`;

export default IssuePage;
