import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '@/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
// import { worker } from './mocks/browser';

// if (process.env.NODE_ENV === 'development') {
//   worker.start({
//     onUnhandledRequest: 'bypass'
//   });
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
