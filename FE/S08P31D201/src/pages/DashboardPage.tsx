import DashboardDatePicker from '@components/dashboard/DatePicker';
import DashboardEquipmentFilter from '@components/dashboard/EquipmentFilter';
import DashboardSafetyIssue from '@components/dashboard/SafetyIssue';
import styled from '@emotion/styled';

function DashboardPage() {
  return (
    <div style={{ display: 'flex', marginTop: '3rem' }}>
      <DashboardDiv>
        <h1>대시보드</h1>
        <DashboardDatePicker />
        <DashboardEquipmentFilter />
        <DashboardSafetyIssue />
      </DashboardDiv>
    </div>
  );
}

const DashboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem;
`;

export default DashboardPage;
