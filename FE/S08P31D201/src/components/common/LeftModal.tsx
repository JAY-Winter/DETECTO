/*
  보완할 점들
  1. leftModalRef.current.offsetWidth를 사용하여 동적으로 너비를 설정할 필요가 있다
  2. leftModalRef.current.style이 아니라 클래스명(ex. opened, closed)을 사용하여 모달창의 열고 닫히는 css를 결정할 필요가 있다

  의문 점
  왜 modalContainer에서 transform: ${props => props.isShowLeftModal ? 'translate(0)' : 'translateX(-100%)'}를 사용하면 애니메이션이 동작하지 않는 것일까??
*/

import { css } from '@emotion/react'
import React, { useEffect, useRef } from 'react'

type ModalProps = {
  children: React.ReactNode,
  onClose: () => void
}

function LeftModal({children, onClose}: ModalProps) {
  const leftModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (leftModalRef.current) {
        leftModalRef.current.style.transform = 'translateX(0)';  // 원위치 시킨다
      }
    }, 0)

    // 모달창 외부를 클릭하였을 때 모달창 닫히도록 함
    const handleClickOutside = (e: MouseEvent) => {
      if (leftModalRef.current && !leftModalRef.current.contains(e.target as Node)) {
        leftModalRef.current.style.transition = 'transform ease 300ms';
        leftModalRef.current.style.transform = 'translateX(-100%)';  // 왼쪽으로 옮긴다
        setTimeout(() => {
          onClose();
        }, 300);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [])

  return (
    <>
      {/* blured 백그라운드 */}
      <div css={backgroundStyle}></div>
      {/* 모달창 컨테이너 */}
      <div css={modalContainer} ref={leftModalRef} >
        {children}
      </div>
    </>
  )
}

const backgroundStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  overflow-y: auto;
  z-index: 1002;
`
const modalContainer = css`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 300px;
  transform: translate(-100%);  // 처음에는 일단 숨긴다 
  transition: transform ease 500ms;
  z-index: 1003;
`

export default LeftModal