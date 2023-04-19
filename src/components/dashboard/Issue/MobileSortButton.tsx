import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Grow, Paper, MenuItem, MenuList, Popper } from '@mui/material';
import styled from '@emotion/styled';
import { TDashboardSortField } from '@/store/DashboardSort';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import useDashSort from '@/hooks/useDashSort';

type Toptions = {
  label: string;
  accessor: TDashboardSortField;
};

const options: Toptions[] = [
  { label: '정렬 기준 선택', accessor: '' },
  { label: '날짜 순 정렬', accessor: 'Date' },
  { label: '위반사항 순 정렬', accessor: 'Equipment' },
  { label: '작업 조 순 정렬', accessor: 'Team' },
];

function MobileSortButton() {
  // 버튼 오픈 State
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // 여기부터 sort 관련 처리

  const [sortField, order, changeSortHandler] = useDashSort();

  React.useEffect(() => {
    setSelectedIndex(options.findIndex(item => item.accessor === sortField));
  }, [sortField]);

  // 카테고리 선택 이후 클릭
  const handleClick = () => {
    changeSortHandler(options[selectedIndex].accessor);
  };
  // 카테고리 처음 선택
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    changeSortHandler(options[index].accessor);
  };

  return (
    <ButtonContainerDiv>
      <ButtonGroup
        sx={{ width: 'fit-content' }}
        variant="contained"
        ref={anchorRef}
        aria-label="sort button"
      >
        <Button size="large" onClick={handleClick}>
          {options[selectedIndex].label}
          {sortField === '' ? null : (
            <>{order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</>
          )}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="sort pop"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ButtonContainerDiv>
  );
}

export default MobileSortButton;

const ButtonContainerDiv = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem 0 1rem 0;
`;
