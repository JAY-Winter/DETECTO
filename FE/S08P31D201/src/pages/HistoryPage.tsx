import useEquipments from '@/hooks/useEquipments';
import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import styled from '@emotion/styled';

function HistoryPage() {
  return (
    <HistoryDiv>
      <h1>히스토리</h1>
      <HistoryDatePicker />
      <HistoryEquipmentFilter />
      <HistorySafetyIssue />
    </HistoryDiv>
  );
}

const HistoryDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${ mobileV } {
    align-items: normal;
  }
`;

export default HistoryPage;
