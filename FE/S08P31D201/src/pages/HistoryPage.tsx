import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import HistorySummary from '@components/history/Summary';
import styled from '@emotion/styled';

function HistoryPage() {
  return (
    <HistoryDiv>
      <HistoryTitle>히스토리</HistoryTitle>
      <HistorySummary />
      <HistoryDatePicker />
      <HistoryEquipmentFilter />
      <HistorySafetyIssue />
    </HistoryDiv>
  );
}

const HistoryTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const HistoryDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${mobileV} {
    align-items: normal;
  }
`;

export default HistoryPage;
