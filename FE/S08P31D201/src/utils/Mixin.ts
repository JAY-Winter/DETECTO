const breakpoints = [1024, 480];

// 태블릿 진입 너비(세로)
export const tabletV = `
  @media (max-width: ${breakpoints[0]}px)
`;

// 모바일 진입 너비(세로)
export const mobileV = `
  @media (max-width: ${breakpoints[1]}px)
`;