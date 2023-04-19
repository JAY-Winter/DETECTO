import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { TtableData } from '@/store/DashboardIssue';
import styled from '@emotion/styled';
import React, { TouchEventHandler, useEffect, useRef, useState } from 'react';
import ModalPortal from '@components/common/ModalPortal';
import { css, keyframes } from '@emotion/react';

function IssueCard(issue: TtableData) {
  const [bsState, setBsState] = useState(false);
  const [bsAni, setBsAni] = useState(true);

  const [beforeMove, setbeforeMove] = useState(0);
  const [afterMove, setaftereMove] = useState(0);

  useEffect(() => {
    if (bsState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [bsState]);

  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const sheetHeader = useRef<HTMLDivElement>(null);
  const sheetContent = useRef<HTMLDivElement>(null);

  const bottomSheetHandler = () => {
    setBsState(prev => !prev);
  };

  const backdropCloseHandler = () => {
    setBsAni(prev => !prev);
    setTimeout(() => {
      setBsState(prev => !prev);
      setBsAni(prev => !prev);
    }, 490);
  };

  const headerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (bottomSheetRef.current) {
      setbeforeMove(bottomSheetRef.current.getBoundingClientRect().y)
    }
  };

  const headerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log(beforeMove);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.setProperty(
        'transform',
        `translateY(${e.touches[0].clientY - beforeMove}px)`
      );
    }
    setaftereMove(e.touches[0].clientY - beforeMove);
  };

  const headerTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log(beforeMove)
    if (beforeMove - afterMove < -100) {
      if (bottomSheetRef.current)
      bottomSheetRef.current.style.setProperty(
        'transform',
        `translateY(${882}px)`
      );
    }
    else {
      console.log('적게움직임')
      if (bottomSheetRef.current)
      bottomSheetRef.current.style.setProperty(
        'transform',
        `translateY(${0}px)`
      );
    }
  };

  return (
    <>
      <Card
        sx={{ width: '100%', marginBottom: '1rem' }}
        onClick={bottomSheetHandler}
      >
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
        {bsState && (
          <>
            <BackdropDiv onClick={backdropCloseHandler} />
            <BottomSheetDiv ref={bottomSheetRef} bsAni={bsAni}>
              <SheetHeader
                ref={sheetHeader}
                onTouchStart={e => headerTouchStart(e)}
                onTouchMove={e => headerTouchMove(e)}
                onTouchEnd={e => headerTouchEnd(e)}
              >
                <span></span>
              </SheetHeader>
              <SheetContentDiv ref={sheetContent}>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
              </SheetContentDiv>
            </BottomSheetDiv>
          </>
        )}
      </ModalPortal>
    </>
  );
}

export default IssueCard;

const bottomUP = keyframes`
  0% {
    bottom: -90vh;
  }
  100% {
    bottom: 0;
  }
`;

const bottomDOWN = keyframes`
  100% {
    bottom: -90vh;
  }
`;

const BackdropDiv = styled.div`
  position: fixed;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
`;

const BottomSheetDiv = styled.div<{ bsAni: boolean }>`
  position: fixed;
  bottom: 0;

  transform: translateY(0);

  height: 90vh;
  width: 100vw;

  z-index: 1000;

  background-color: ${props => props.theme.palette.neutral.section};

  transition: 0.2s all ease-out;

  animation: ${props => {
    return props.bsAni
      ? css`
          ${bottomUP} 0.5s ease
        `
      : css`
          ${bottomDOWN} 0.5s ease
        `;
  }};
`;

const SheetHeader = styled.div`
  display: flex;
  justify-content: center;

  span {
    width: 70%;
    height: 0.5rem;
    margin: 0.5rem;
    background-color: ${props => props.theme.palette.primary.dark};
    border-radius: 1rem;
  }
`;

const SheetContentDiv = styled.div`
  height: calc(90vh - 1rem);
  overflow-y: auto;
`;
