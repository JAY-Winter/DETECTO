import { mobileV } from '@/utils/Mixin';
import styled from '@emotion/styled';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  RestartAlt,
} from '@mui/icons-material';
import { Button, Chip, Paper } from '@mui/material';
import React, { useState } from 'react';

function ObjectionFilter({obFilter, setFilterOb}: {obFilter: string[], setFilterOb: (obState: string[]) => void}) {
  // 모바일 드롭다운 State
  const [mobileOpen, setMobileOpen] = useState(false);

  const resetFilterEq = () => {
    setFilterOb([])
  };

  return (
    <ObjectionPaper>
      {/* 모바일에서 클릭 시 드롭다운 open/close */}
      <FilterHeaderDiv
        onClick={() => {
          setMobileOpen(prev => !prev);
        }}
      >
        <div>
          {mobileOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          이의 상태 선택
        </div>
        <Button
          onClick={e => {
            e.stopPropagation();
            resetFilterEq();
          }}
        >
          <span>초기화</span>
          <RestartAlt color="primary" />
        </Button>
      </FilterHeaderDiv>
      {/* mobileopen props를 통해 모바일에서 드롭다운 표시 */}
      {/* 모바일이 아닐 경우 항상 표시 됨 */}
      <FilterContentDiv mobileopen={mobileOpen}>
        <ObjectionChip
          label={"이의 거절"}
          color="primary"
          variant={obFilter.includes("REJECTED") ? 'filled' : 'outlined'}
          onClick={() => {
            setFilterOb(["REJECTED"])}}
          clickable
        />
        <ObjectionChip
          label={"이의 처리 중"}
          color="primary"
          variant={obFilter.includes("PENDING") ? 'filled' : 'outlined'}
          onClick={() => {
            setFilterOb(["PENDING"])}}
          clickable
        />
        <ObjectionChip
          label={"이의 승낙"}
          color="primary"
          variant={obFilter.includes("APPLIED") ? 'filled' : 'outlined'}
          onClick={() => {
            setFilterOb(["APPLIED"])}}
          clickable
        />
      </FilterContentDiv>
    </ObjectionPaper>
  );
}

export default ObjectionFilter;

const ObjectionPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.3rem 1.5rem;
  margin-right: 1rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;
`;

const FilterHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    svg {
      display: none;
    }
  }

  button {
    padding: 0;
  }

  /* 모바일 한정 svg, 초기화 span */
  ${mobileV} {
    margin-bottom: 0;
    div {
      svg {
        display: block;
      }
    }
    button {
      display: flex;
      justify-content: flex-end;
      span {
        display: none;
      }
    }
  }
`;

const FilterContentDiv = styled.div<{ mobileopen: boolean }>`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 1rem;
  overflow: auto;

  /* 모바일 한정 컨텐츠 표시 */
  ${mobileV} {
    display: ${props => (props.mobileopen ? 'block' : 'none')};
  }
`;

const ObjectionChip = styled(Chip)`
  font-size: 1rem;
  margin: 0 0 0.5rem 0.5rem;
`;