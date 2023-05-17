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
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';
import RaiseIssueButton from '@components/RaiseIssue/RaiseIssueButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import { HistoryIssue } from '@/store/HistoryIssue';
import axios from 'axios';
import { Button, Paper } from '@mui/material';

function IssueCard(issue: ReportType) {
  const { bottomSheetHandler, isOpen, open } = useBottomSheet();
  const userInfo = useRecoilValue(UserInfo);
  const [reportList, setReportList] = useRecoilState(HistoryIssue);

  const removeHandler = () => {
    const remove = window.confirm('정말 리포트를 삭제 하시겠습니까?');
    if (remove) {
      console.log('삭제 눌렸습니다!');
      axios({
        method: 'delete',
        url: `https://detecto.kr/api/report/${issue.id}`,
      })
        .then(res =>
          setReportList(prev => prev.filter(report => report.id !== issue.id))
        )
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Card sx={{ width: '100%', marginBottom: '1rem' }} onClick={open}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: 'primary.main' }}
              aria-label="recipe"
              src={issue.user?.image}
            >
              {issue.user.id !== -1 ? issue.user.name[0] : 'X'}
            </Avatar>
          }
          title={timeFormatter(issue.time).replace('-', ' ')}
          subheader={
            issue.user?.name === undefined
              ? '위반자 : 미지정'
              : '위반자 : ' + issue.user?.name
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
            안전장구 위반 : {stringListFormatter(issue.reportItems)}
          </Typography>
        </CardContent>
      </Card>
      <ModalPortal>
        {isOpen && (
          <IssueBottomSheet handler={bottomSheetHandler}>
            <MobileCard>
              <IssueImage reportid={issue.id.toString()} />
            </MobileCard>
            <MobileCard>
              <h1>위반 내역</h1>
              <h4>위반 일시</h4>
              <p>{timeFormatter(issue.time)}</p>
              <h4>위반 작업자</h4>
              <p>
                {issue.user.name} ({issue.team.teamName})
              </p>
              <h4>위반 사항</h4>
              <p>{stringListFormatter(issue.reportItems)}</p>
              <h4>위반 지역</h4>
              <p>{issue.cctvArea}번 구역</p>
            </MobileCard>
            {userInfo.type === 'WORKER' && <RaiseIssueButton report={issue} />}
            {userInfo.type === 'ADMIN' && (
              <>
                <Paper
                  sx={{
                    margin: '0 1rem',
                    borderRadius: '5px',
                    padding: '1rem 0.5rem 0.2rem 0.5rem',
                  }}
                >
                  <MemberCard
                    reportId={issue.id}
                    teamList={issue.team}
                    violate_member={issue.user}
                  />
                </Paper>
                <Button
                  sx={{
                    float: 'right',
                    margin: '0.8rem 1rem 0.5rem 0',
                    color: 'error.main',
                  }}
                  onClick={removeHandler}
                >
                  위반 내역 삭제
                </Button>
              </>
            )}
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
