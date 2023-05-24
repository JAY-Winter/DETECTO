import React from 'react'
import WorkerNavigationBar from './WorkerNavigationBar';
import WorkerNavigationBarTablet from './WorkerNavigationBarTablet';
import WorkerNavigationBarMobile from './WorkerNavigationBarMobile';

type WorkerNavProviderProps = {
  children: React.ReactNode,
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>
}

function WorkerNavProvider({ children, setMode }: WorkerNavProviderProps) {
  return (
    <>
      <WorkerNavigationBar setMode={setMode} />
      <WorkerNavigationBarTablet setMode={setMode} />
      <WorkerNavigationBarMobile />
      {children}
    </>
  )
}

export default WorkerNavProvider