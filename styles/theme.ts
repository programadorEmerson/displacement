import { Roboto } from 'next/font/google';

import { createTheme } from '@mui/material/styles';
import { ptBR as dataGridPtBr } from '@mui/x-data-grid';
import { ptBR as dateTimePtBr } from '@mui/x-date-pickers/locales';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme(
  {
    palette: {
      primary: {
        light: '#bdc3c7',
        main: '#34495e',
        dark: '#2c3e50'
      },
      secondary: {
        light: '#a29bfe',
        main: '#6D4AEC',
        dark: '#5f27cd',
      },
      error: {
        light: '#ff4d4d',
        main: '#ff3838',
        dark: ' #b33939'
      },
      success: {
        light: '#1dd1a1',
        main: '#10ac84',
        dark: '#01a3a4'
      },
      warning: {
        light: '#feca57',
        main: '#ff9f43',
        dark: '#ff7f50'
      }
    },
    typography: {
      fontFamily: roboto.style.fontFamily
    }
  },
  dateTimePtBr,
  dataGridPtBr
);

export default theme;
