import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import styled from '@emotion/styled';

function HistoryPage() {
  return (
    <div style={{ display: 'flex', marginTop: '3rem' }}>
      <HistoryDiv>
        <h1>히스토리</h1>
        <HistoryDatePicker />
        <HistoryEquipmentFilter />
        <HistorySafetyIssue />
      </HistoryDiv>
    </div>
  );
}

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem;
`;

export default HistoryPage;
