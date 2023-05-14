import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ModalPortal from '@components/common/ModalPortal';
import useBottomSheet from '@/hooks/useBottomSheet';
import IssueBottomSheet from './IssueBottomSheet';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';
import styled from '@emotion/styled';
import { ReportType } from 'ReportTypes';
import IssueMap from './IssueMap';

function IssueCard(issue: ReportType) {
  const { bottomSheetHandler, isOpen, open } = useBottomSheet();

  const timeFormatter = (time: ReportType['time']) => {
    return new Date(time).toISOString().replace('T', ' ').slice(0, -5);
  };

  const itemFormatter = (reportItems: ReportType['reportItems']) => {
    const items = [...reportItems];
    const sortedItems = items.sort().join(', ');
    return sortedItems;
  };

  console.log(issue);
  return (
    <>
      <Card sx={{ width: '100%', marginBottom: '1rem' }} onClick={open}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: 'primary.main' }}
              aria-label="recipe"
              src={issue.user?.userImage}
            >
              {issue.user.id !== -1 ? issue.user.name[0] : 'X'}
            </Avatar>
          }
          title={'위반날짜 : ' + timeFormatter(issue.time)}
          subheader={
            issue.user?.userName === undefined
              ? '위반자 : 미지정'
              : '위반자 : ' + issue.user?.userName
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={`https://kr.object.ncloudstorage.com/detec/report/${issue.id}.jpg`}
          alt="위반 이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            안전장구 위반 : {itemFormatter(issue.reportItems)}
          </Typography>
        </CardContent>
      </Card>
      <ModalPortal>
        {isOpen && (
          <IssueBottomSheet handler={bottomSheetHandler}>
            <MobileCard>
              <h1>상세 정보</h1>
              <h4>위반 날짜</h4>
              <p>{timeFormatter(issue.time)}</p>
              <h4>위반 팀</h4>
              <p>{issue.team.teamName}팀</p>
              <h4>위반 사항</h4>
              <p>{itemFormatter(issue.reportItems)}</p>
            </MobileCard>
            <MobileCard>
              <IssueImage reportid={issue.id.toString()} />
            </MobileCard>
            <MobileCard>
              <MemberCard teamList={issue.team} violate_member={issue.user} />
            </MobileCard>
          </IssueBottomSheet>
        )}
      </ModalPortal>
    </>
  );
}

export default IssueCard;

const MobileCard = styled(Card)`
  padding: 1rem;
  margin: 1rem;
  line-height: 1.5rem;

  h1 {
    margin: 1rem 0 1.8rem 0;
  }
  p {
    margin-bottom: 1rem;
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
`;
