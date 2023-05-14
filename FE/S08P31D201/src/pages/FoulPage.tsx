import useEquipments from '@/hooks/useEquipments';
import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import HistorySummary from '@components/history/Summary';
import styled from '@emotion/styled';

function FoulPage() {
  return (
    <HistoryDiv>
      <HistoryTitle>위반 목록</HistoryTitle>
      <HistorySummary />
      <HistoryFilterWrapper>
        <HistoryDatePicker />
        <HistoryEquipmentFilter />
      </HistoryFilterWrapper>
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

const HistoryFilterWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  ${mobileV} {
    flex-direction: column;
  }
`;

export default FoulPage;
