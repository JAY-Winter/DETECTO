import DashboardDatePicker from '@components/dashboard/DatePicker';
import DashboardEquipmentFilter from '@components/dashboard/EquipmentFilter';
import DashboardSafetyIssue from '@components/dashboard/SafetyIssue';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

function DashboardPage() {
  return (
    <DashboardDiv>
      <h1>대시보드</h1>
      <DashboardEquipmentFilter />
      <DashboardDatePicker />
      <DashboardSafetyIssue />
    </DashboardDiv>
  );
}

const DashboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;

  margin: 1rem;
`

export default DashboardPage;
