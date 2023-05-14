import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import styled from '@emotion/styled';

function IssuePage() {
  return (
    <IssueDiv>
      <IssueTitle>이의제기 목록</IssueTitle>
      <HistoryDatePicker />
      <HistoryEquipmentFilter />
      <HistorySafetyIssue />
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

export default IssuePage;
