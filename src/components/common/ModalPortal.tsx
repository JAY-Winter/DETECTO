import React from 'react'
import ReactDOM from 'react-dom'

type ModalPortalProps = {
  children: React.ReactNode
}

function ModalPortal({ children }: ModalPortalProps) {
  const element = document.getElementById('modal') as HTMLElement  // DOM 직접 접근하여 modal id를 가진 div 태그를 참조한다
  return (
    ReactDOM.createPortal(children, element) // children은 렌더링 가능한 React children이다. element는 DOM element이다
  )
}

export default ModalPortal