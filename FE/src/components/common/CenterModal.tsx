import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react'

type CenterModalProps = {
  children: React.ReactElement,
  onClose: () => void
}

function CenterModal({ children, onClose}: CenterModalProps) {
  const centerModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 모달창 외부를 클릭하였을 때 모달창 닫히도록 함
    const handleClickOutside = (e: MouseEvent) => {
      if (centerModalRef.current && !centerModalRef.current.contains(e.target as Node)) {
        const isCloseModal = confirm("편집을 종료하시겠습니까??\n(지금 닫으시면 수정한 내용은 반영되지 않습니다)");
        if (isCloseModal) {
          onClose();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [])

  return (
    <>
      <BackgroundDiv></BackgroundDiv>
      <div css={modalContainer} ref={centerModalRef}>
        { children }
        {/* {React.cloneElement(children, { onClose }) } */}
      </div>
    </>
  )
}

const scaleUp = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
 
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  overflow-y: auto;
  z-index: 1002;
  background-color: ${props => props.theme.palette.neutral.opposite + "20"};
`

const modalContainer = css`
  position: fixed;
  animation: ${scaleUp} 500ms ease forwards;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
`

export default CenterModal