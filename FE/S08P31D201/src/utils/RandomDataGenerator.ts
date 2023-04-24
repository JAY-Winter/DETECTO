/* 랜덤하게 정수를 반환하는 함수(min ~ max까지) */
// ex) const randomNumber = getRandomNumber(1, 1000);
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* 문자열 길이만큼 랜덤하게 생성된 문자를 반환하는 함수 */
// ex) const randomString = getRandomString(문자열 길이: 10);
export function getRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

/* boolean 값을 랜덤하게 반환하는 함수 */
export function getRandomBool() {
  return Math.random() < 0.5;
}