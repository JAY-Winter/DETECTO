import { mobileV } from '@/utils/Mixin';
import IssueList from '@components/RaiseIssue/IssueList';
import styled from '@emotion/styled';

function IssuePage() {
  return (
    <IssueDiv>
      <IssueTitle>이의제기 목록</IssueTitle>
      <IssueList />
    </IssueDiv>
  );
}

const IssueDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${mobileV} {
    align-items: normal;
  }
`;

const IssueTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export default IssuePage;
