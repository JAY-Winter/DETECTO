import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '@/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

// const registServiceWorker = async () => {
//   if ('serviceWorker' in navigator) {
//     try {
//       console.log("서비스 워커 등록 성공!");
      
//       const worker = await navigator.serviceWorker.register('/service-worker.js');
//     }
//     catch (error) {
//       console.error("서비스 워커 등록 에러...", error);
//     }
//   }
// }
// registServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
