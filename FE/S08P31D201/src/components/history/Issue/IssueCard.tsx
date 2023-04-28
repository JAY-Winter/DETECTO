import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { TtableData } from '@/store/HistoryIssue';
import ModalPortal from '@components/common/ModalPortal';
import useBottomSheet from '@/hooks/useBottomSheet';
import IssueBottomSheet from './IssueBottomSheet';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';

function IssueCard(issue: TtableData) {
  const { bottomSheetHandler, isOpen, open } = useBottomSheet();

  return (
    <>
      <Card sx={{ width: '100%', marginBottom: '1rem' }} onClick={open}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: 'primary.main' }}
              aria-label="recipe"
              src={issue.violate_member?.memberImg}
            >
              X
            </Avatar>
          }
          title={'위반날짜 : ' + issue.date}
          subheader={
            issue.violate_member?.memberName === undefined
              ? '위반자 : 미지정'
              : '위반자 : ' + issue.violate_member?.memberName
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={issue.violate_img}
          alt="위반 이미지"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            안전장구 위반 : {issue.issue.toString()}
          </Typography>
        </CardContent>
      </Card>
      <ModalPortal>
        {isOpen && (
          <IssueBottomSheet handler={bottomSheetHandler}>
            <p>위반 사항</p>
            <p>뭐라도 쓰지 않을까요?</p>
            <IssueImage violate_img={issue.violate_img} />
            <MemberCard
              teamList={issue.teamList}
              violate_member={issue.violate_member}
            />
          </IssueBottomSheet>
        )}
      </ModalPortal>
    </>
  );
}

export default IssueCard;
