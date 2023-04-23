import { css, jsx, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

export type TbottomSheetHandler = {
  bsAni: boolean;
  isTop: boolean;
  bottomSheetRef: React.RefObject<HTMLDivElement>;
  sheetHeader: React.RefObject<HTMLDivElement>;
  sheetContent: React.RefObject<HTMLDivElement>;
  sheetObserver: React.RefObject<HTMLDivElement>;
  backdropCloseHandler: () => void;
  headerTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  headerTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  headerTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  contentTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  contentTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  contentTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
};

function IssueBottomSheet({
  children,
  handler,
}: {
  children?: React.ReactNode;
  handler: TbottomSheetHandler;
}) {
  return (
    <>
      <BackdropDiv onClick={handler.backdropCloseHandler} />
      <BottomSheetDiv ref={handler.bottomSheetRef} bsAni={handler.bsAni}>
        <SheetHeader
          ref={handler.sheetHeader}
          onTouchStart={handler.headerTouchStart}
          onTouchMove={handler.headerTouchMove}
          onTouchEnd={handler.headerTouchEnd}
        >
          <span></span>
        </SheetHeader>
        <SheetContentDiv
          ref={handler.sheetContent}
          onTouchStart={
            handler.isTop
              ? handler.contentTouchStart
              : () => {
                  return;
                }
          }
          onTouchMove={
            handler.isTop
              ? handler.contentTouchMove
              : () => {
                  return;
                }
          }
          onTouchEnd={
            handler.isTop
              ? handler.contentTouchEnd
              : () => {
                  return;
                }
          }
        >
          <div ref={handler.sheetObserver}></div>
          {children}
        </SheetContentDiv>
      </BottomSheetDiv>
    </>
  );
}

export default IssueBottomSheet;

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

  background-color: rgba(0, 0, 0, 0.2);
`;

const BottomSheetDiv = styled.div<{ bsAni: boolean }>`
  position: fixed;
  bottom: 0;

  transform: translateY(0);

  height: 70vh;
  width: 100vw;

  border-radius: 10px 10px 0 0;

  z-index: 1000;

  background-color: ${props => props.theme.palette.neutral.section};

  transition: 0.2s transform ease-in-out;

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
  height: calc(70vh - 1.5rem);
  overflow-y: auto;
  background-color: ${props => props.theme.palette.neutral.section};
`;
