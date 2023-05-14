import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

function MonitorLoding() {
  return (
    <LoadingDiv>
      <div className="spinner-square">
        <div className="square-1 square"></div>
        <div className="square-2 square"></div>
        <div className="square-3 square"></div>
      </div>
    </LoadingDiv>
  );
}

export default MonitorLoding;

const loadingSpinner = keyframes`
    0% {
        height: 5rem;
        background-color: rgb(111, 200, 240);
    }
    20% {
        height: 5rem;
    }
    40% {
        height: 7rem;
        background-color: rgb(111, 200, 240);
    }
    80% {
        height: 5rem;
    }
    100% {
        height: 5rem;
        background-color: rgb(111, 163, 240);
    }
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 480px;

  .spinner-square {
    display: flex;
    flex-direction: row;
    width: 90px;
    height: 120px;
  }

  .spinner-square > .square {
    width: 17px;
    height: 80px;
    margin: auto auto;
    border-radius: 4px;
  }

  .square-1 {
    animation: ${loadingSpinner} 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s
      infinite;
  }

  .square-2 {
    animation: ${loadingSpinner} 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)
      200ms infinite;
  }

  .square-3 {
    animation: ${loadingSpinner} 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)
      400ms infinite;
  }
`;
