import React, { useEffect, useRef, useState } from 'react';
import { TbottomSheetHandler } from '@components/dashboard/Issue/IssueBottomSheet';


function useBottomSheet(): {
  bottomSheetHandler: TbottomSheetHandler;
  isOpen: boolean;
  open: () => void;
} {
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

  const open = () => {
    setBsState(true);
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
      setbeforeMove(bottomSheetRef.current.getBoundingClientRect().y);
    }
  };

  const headerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (bottomSheetRef.current) {
      if (e.touches[0].clientY - beforeMove < 0 && sheetContent.current) {
        sheetContent.current.style.setProperty(
          'height',
          `calc(90vh + ${-(e.touches[0].clientY - beforeMove)}px)`
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
            `calc(90vh - 1.5rem)`
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
          `calc(90vh + ${-(e.touches[0].clientY - beforeMove)}px)`
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
            `calc(90vh - 1.5rem)`
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

  return { bottomSheetHandler, isOpen: bsState, open };
}

export default useBottomSheet;