import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            light: '#5482f4',
            main: '#0044ee',
            dark: '#0030a9',
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
          neutral: {
            main: '#ffffff',
            section: '#fafafa',
          },
          text: {
            primary: '#000000',
            secondary: '#888888',
            disabled: '#B6B6B6',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: '#e6ecfd',
            main: '#8aa9f7',
            dark: '#3369f1',
            contrastText: '#000000',
          },
          secondary: {
            light: '#fff9e6',
            main: '#ffe28d',
            dark: '#ffcd39',
            contrastText: '#000000',
          },
          success: {
            light: '#e9faea',
            main: '#9ae9a0',
            dark: '#50d95a',
            contrastText: '#000000',
          },
          error: {
            light: '#f7e6e9',
            main: '#db8a98',
            dark: '#c0334d',
            contrastText: '#000000',
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
          neutral: {
            main: '#121212',
            section: '#1e1e1e',
          },
          text: {
            primary: '#fff',
            secondary: '#888888',
            disabled: '#B6B6B6',
          },
        }),
  },
  typography: {
    fontFamily: 'Pretendard',
  },
});

export default getDesignTokens;
