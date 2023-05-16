import NavigationBar from '@components/navbar/NavigationBar';
import NavigationBarMobile from '@components/navbar/NavigationBarMobile';
import NavigationBarTablet from '@components/navbar/NavigationBarTablet';
import React from 'react'

type NavProviderProps = {
  children: React.ReactNode,
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>
}

function NavProvider({ children, setMode }: NavProviderProps) {
  return (
    <>
      <NavigationBar setMode={setMode} />
      <NavigationBarTablet setMode={setMode} />
      <NavigationBarMobile />
      {children}
    </>
  )
}

export default NavProvider