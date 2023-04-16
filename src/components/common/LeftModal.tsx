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
  isShowLeftModal: boolean,
  onClose: () => void
}

function LeftModal({children, isShowLeftModal, onClose}: ModalProps) {
  const leftModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 모달창 외부를 클릭하였을 때 모달창 닫히도록 함
    const handleClickOutside = (e: MouseEvent) => {
      if (leftModalRef.current && !leftModalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [])

  // 모달창 닫히고 열리는 상태에 따라 translateX를 조정한다
  useEffect(() => {
    if (!leftModalRef.current) {
      return;
    }
    
    if (isShowLeftModal === true) {  // 모달창 열린다면
      leftModalRef.current.style.transform = 'translateX(0)';  // 원위치 시킨다
    } else {  // 모달창 닫힌다면
      leftModalRef.current.style.transform = 'translateX(-100%)';  // 왼쪽으로 옮긴다
    }
  }, [isShowLeftModal])

  return (
    <>
      {/* blured 백그라운드 */}
      <div css={container} style={{display: `${isShowLeftModal ? 'block' : 'none'}`}}></div>
      {/* 모달창 컨테이너 */}
      <div css={modalContainer} ref={leftModalRef} >
        {children}
      </div>
    </>
  )
}

const container = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  overflow-y: auto;
`
const modalContainer = css`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 300px;
  background-color: red;
  transform: translate(-100%);  // 처음에는 일단 숨긴다. 의문) 왜 여기서 props.isShowLeftModal를 사용하여 
  transition: transform 0.3s;
  z-index: 20;
`

export default LeftModal