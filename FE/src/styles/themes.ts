import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            light: '#5688c1',
            main: '#034ea2',
            dark: '#023773',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ffd559',
            main: '#ffc107',
            dark: '#b58905',
            contrastText: '#fff',
          },
          success: {
            light: '#6ce075',
            main: '#24d031',
            dark: '#1a9423',
            contrastText: '#fff',
          },
          error: {
            light: '#ca546a',
            main: '#b00020',
            dark: '#7d0017',
            contrastText: '#fff',
          },
          neutral: {
            opposite: '#121212',
            main: '#ffffff',
            section: '#fafafa',
            card: '#ececec',
            cardHover: '#e0e0e0'
          },
          text: {
            primary: '#000000',
            secondary: '#8D8D8D',
            disabled: '#aaaaaa',
          },
          grey: {
            0: '#ffffff',
            10: '#fafafa',
            20: '#f6f6f6',
            30: '#ececec',
            40: '#e0e0e0',
            50: '#c4c4c4',
            60: '#b6b6b6',
            70: '#aaaaaa',
            80: '#9b9b9b',
            90: '#8d8d8d',
            100: '#7f7f7f',
            200: '#717171',
            300: '#636363',
            400: '#575757',
            500: '#494949',
            600: '#3d3d3d',
            700: '#2c2c2c',
            800: '#1e1e1e',
            900: '#121212',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: '#e6edf6',
            main: '#8baed4',
            dark: '#3369f1',
            contrastText: '#000000',
          },
          secondary: {
            light: '#fff9e6',
            main: '#ffe28d',
            dark: '#3571b5',
            contrastText: '#000000',
          },
          success: {
            light: '#e9faea',
            main: '#9ae9a0',
            dark: '#50d95a',
            contrastText: '#000000',
          },
          error: {
            light: '#e7b0ba',
            main: '#ca546a',
            dark: '#b00020',
            contrastText: '#000000',
          },
          neutral: {
            opposite: '#ffffff',
            main: '#121212',
            section: '#1e1e1e',
            card: '#2c2c2c',
            cardHover: '#3d3d3d'
          },
          text: {
            primary: '#fff',
            secondary: '#888888',
            disabled: '#636363',
          },
          grey: {
            0: '#ffffff',
            10: '#fafafa',
            20: '#f6f6f6',
            30: '#ececec',
            40: '#e0e0e0',
            50: '#c4c4c4',
            60: '#b6b6b6',
            70: '#aaaaaa',
            80: '#9b9b9b',
            90: '#8d8d8d',
            100: '#7f7f7f',
            200: '#717171',
            300: '#636363',
            400: '#575757',
            500: '#494949',
            600: '#3d3d3d',
            700: '#2c2c2c',
            800: '#1e1e1e',
            900: '#121212',
          },
        }),
  },
  typography: {
    fontFamily: 'Pretendard',
    fontSize: 16
  }
});

export default getDesignTokens;
