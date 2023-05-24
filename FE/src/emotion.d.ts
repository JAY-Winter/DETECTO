import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      mode: 'dark' | 'light';
      primary: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      success: {
        light: string;
        main: string;
        dark: string;
        contrastText:string;
      };
      error: {
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      neutral: {
        opposite: string;
        main: string;
        section: string;
        card: string;
        cardHover: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      grey: {
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        60: string;
        70: string;
        80: string;
        90: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
  }
}
