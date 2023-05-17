import { useState } from 'react';
import styled from '@emotion/styled';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ReportType } from 'ReportTypes';
import TableCollapseCard from './TableCollapseCard';
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import WorkerTableCollapseCard from '@components/foul/WorkerTableCollapseCard';
import { EquipmentsAtom } from '@/store/EquipmentStore';

function Row(props: { row: ReportType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const userInfo = useRecoilValue(UserInfo);

  const equipmentList = useRecoilValue(EquipmentsAtom);

  return (
    <>
      <IssueTableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
        open={open}
      >
        <TableCell align="left">
          <span style={{ fontWeight: 'bold' }}>{row.user.name}</span> (
          {row.team.teamName})
        </TableCell>
        <TableCell align="left">
          {stringListFormatter(
            row.reportItems.map(item => {
              if (equipmentList) {
                const foundItem = equipmentList.find(eq => eq.name === item);
                return foundItem ? foundItem.description : '';
              } else return '';
            })
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {timeFormatter(row.time)}
        </TableCell>
        <TableCell align="right" padding="checkbox">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </TableCell>
      </IssueTableRow>
      <CollapseTableRow open={open}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {userInfo.type === 'ADMIN' ? (
              <TableCollapseCard
                x={row.x}
                y={row.y}
                reportid={row.id}
                area={row.cctvArea}
                violate_member={row.user}
                teamList={row.team}
                report={row}
              />
            ) : (
              <WorkerTableCollapseCard reportid={row.id} report={row} />
            )}
          </Collapse>
        </TableCell>
      </CollapseTableRow>
    </>
  );
}

export default Row;

const IssueTableRow = styled(TableRow)<{ open: boolean }>`
  th,
  td {
    padding: 0.8rem 1rem;
    padding-left: 1.5rem;
    border: none;
    background-color: ${props =>
      props.open ? props.theme.palette.neutral.cardHover : ''};
  }

  @media (hover: hover) {
    &:hover {
      th,
      td {
        background-color: ${props => props.theme.palette.neutral.card};
      }
      cursor: pointer;
    }
  }
`;

const CollapseTableRow = styled(TableRow)<{ open: boolean }>`
  th,
  td {
    padding: 0.8rem 1.5rem;
    border: none;
    background-color: ${props => props.theme.palette.neutral.cardHover};
  }
`;
