import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import React, { useState } from 'react';

function SafetyEquipmentChip({ eqLabel }: { eqLabel: string }) {
  const [clicked, setClicked] = useState(false);

  const chipHandler = () => {
    setClicked(prev => !prev)
  }

  return (
    <EquipmentChip
      label={eqLabel}
      color="primary"
      variant={clicked ? 'filled' : 'outlined'}
      onClick={chipHandler}
      clickable
    />
  );
}

export default SafetyEquipmentChip;

const EquipmentChip = styled(Chip)`
  font-size: 1rem;
  margin: 0 0 0.5rem 0.5rem;
`;
