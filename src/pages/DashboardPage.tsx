import { EquipmentsAtom } from '@/store/EquipmentStore';
import DashboardDatePicker from '@components/dashboard/DatePicker';
import DashboardEquipmentFilter from '@components/dashboard/EquipmentFilter';
import DashboardSafetyIssue from '@components/dashboard/SafetyIssue';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';


function DashboardPage() {
  const equips = useRecoilValue(EquipmentsAtom);
  useEffect(() => {
    console.log("dashboard: ", equips);
  }, [])

  return (
    <div style={{display: "flex"}}>
      <DashboardDiv>
        <h1>대시보드</h1>
        <DashboardEquipmentFilter />
        <DashboardDatePicker />
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
`

export default DashboardPage;
