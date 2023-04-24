import React, { useEffect, useRef, useState } from 'react';
import { TbottomSheetHandler } from '@components/dashboard/Issue/IssueBottomSheet';

function useBottomSheet(): {
  bottomSheetHandler: TbottomSheetHandler;
  isOpen: boolean;
  open: () => void;
} {
  // 바텀시트 오픈과 관련된 state
  const [bsState, setBsState] = useState(false);
  const [bsAni, setBsAni] = useState(true);

  // 바텀시트 open함수
  const open = () => {
    setBsState(true);
  };

  // 터치 움직임과 관련된 state
  const [beforeMove, setbeforeMove] = useState(0);
  const [afterMove, setaftereMove] = useState(0);

  // 드래그 방지
  useEffect(() => {
    if (bsState) {
      const pageY = window.pageYOffset;

      document.body.setAttribute('scrollY', pageY.toString());

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.left = '0px';
      document.body.style.right = '0px';
      document.body.style.bottom = '0px';
      document.body.style.top = `-${pageY}px`;
    } else {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('left');
      document.body.style.removeProperty('right');
      document.body.style.removeProperty('bottom');

      window.scrollTo(0, Number(document.body.getAttribute('scrollY')));

      document.body.removeAttribute('scrollY');
    }
  }, [bsState]);

  // 바텀시트 ref
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const sheetHeader = useRef<HTMLDivElement>(null);
  const sheetContent = useRef<HTMLDivElement>(null);

  // 최상단에 위치할 시 intersection observer
  const sheetObserver = useRef<HTMLDivElement>(null);
  const [isTop, setIsTop] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTop(entry.isIntersecting);
      },
      {
        root: sheetContent.current,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (sheetObserver.current) {
      observer.observe(sheetObserver.current);
    }

    return () => {
      if (sheetObserver.current) {
        observer.unobserve(sheetObserver.current);
      }
    };
  }, [bsState]);

  // 터치 함수
  const backdropCloseHandler = () => {
    setBsAni(prev => !prev);
    setTimeout(() => {
      setBsState(prev => !prev);
      setBsAni(prev => !prev);
    }, 490);
  };

  const headerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (bottomSheetRef.current) {
      setbeforeMove(bottomSheetRef.current.getBoundingClientRect().y);
    }
  };

  const headerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (bottomSheetRef.current) {
      if (e.touches[0].clientY - beforeMove < 0 && sheetContent.current) {
        sheetContent.current.style.setProperty(
          'height',
          `calc(70vh + ${-(e.touches[0].clientY - beforeMove)}px)`
        );
      }
      bottomSheetRef.current.style.setProperty(
        'transform',
        `translateY(${e.touches[0].clientY - beforeMove}px)`
      );
    }
    setaftereMove(e.touches[0].clientY - beforeMove);
  };

  const headerTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (beforeMove - afterMove < -100) {
      if (bottomSheetRef.current)
        bottomSheetRef.current.style.setProperty(
          'transform',
          `translateY(${882}px)`
        );
      backdropCloseHandler();
    } else {
      if (bottomSheetRef.current)
        bottomSheetRef.current.style.setProperty(
          'transform',
          `translateY(${0}px)`
        );

      setTimeout(() => {
        if (sheetContent.current) {
          sheetContent.current.style.setProperty(
            'height',
            `calc(70vh - 1.5rem)`
          );
        }
      }, 200);
    }
  };

  const contentTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (bottomSheetRef.current) {
      setbeforeMove(e.touches[0].clientY);
    }
  };

  const contentTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (bottomSheetRef.current && e.touches[0].clientY - beforeMove > 0) {
      if (e.touches[0].clientY - beforeMove < 0 && sheetContent.current) {
        sheetContent.current.style.setProperty(
          'height',
          `calc(70vh + ${-(e.touches[0].clientY - beforeMove)}px)`
        );
      }
      bottomSheetRef.current.style.setProperty(
        'transform',
        `translateY(${e.touches[0].clientY - beforeMove}px)`
      );
    }
    setaftereMove(e.touches[0].clientY - beforeMove);
  };

  const contentTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (beforeMove - afterMove < 100) {
      if (bottomSheetRef.current)
        bottomSheetRef.current.style.setProperty(
          'transform',
          `translateY(${882}px)`
        );
      backdropCloseHandler();
    } else {
      if (bottomSheetRef.current)
        bottomSheetRef.current.style.setProperty(
          'transform',
          `translateY(${0}px)`
        );

      setTimeout(() => {
        if (sheetContent.current) {
          sheetContent.current.style.setProperty(
            'height',
            `calc(70vh - 1.5rem)`
          );
        }
      }, 200);
    }
  };

  const bottomSheetHandler: TbottomSheetHandler = {
    bsAni,
    isTop,
    bottomSheetRef,
    sheetHeader,
    sheetContent,
    sheetObserver,
    backdropCloseHandler,
    headerTouchStart,
    headerTouchMove,
    headerTouchEnd,
    contentTouchStart,
    contentTouchMove,
    contentTouchEnd,
  };

  // <button onClick={open} />
  // {isOpen && 
  //     <IssueBottomSheet handler={bottomSheetHandler}> 
  //       {children} 
  //     </IssueBottomSheet>
  // }
  return { bottomSheetHandler, isOpen: bsState, open };
}

export default useBottomSheet;
