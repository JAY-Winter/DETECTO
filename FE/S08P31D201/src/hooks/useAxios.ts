import { useAxiosParmas } from "AxiosRequest";
import axios from "axios"
import { useEffect, useState } from "react"

/* 사용 예시
  const reqeustObj = {
    url: "posts/1",
    method: 'get' as const,
    body: undefined
  }
  
  const [data, isLoading, status, setIsFire] = useAxios({requestObj: reqeustObj});

  <button onClick={() => setIsFire(true)}>요청 보내기</button>
*/

// isFire, 요청객체(메소드, 세부 요청 url, 실어보낼 데이터), 요청 메소드, 에러 핸들러, finally 메소드를 입력 받음
function useAxios({ requestObj, tryHandler, catchHandler, finallyHandler }: useAxiosParmas) {
  // 데이터, 로딩 상태, 데이터, 응답 코드
  const [isFire, setIsFire] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<number>();

  const request = async () => {
    const {url, method, body} = requestObj;
    try {
      const response = await axios({
        url: url,
        method: method,
        baseURL: 'https://jsonplaceholder.typicode.com/',
        data: body,
        timeout: 5000,
        withCredentials: true
      })
      console.log(response.data);
      if (tryHandler) {
        tryHandler();
      }
    } catch {
      if (catchHandler) {
        catchHandler();
      }

    } finally {
      setIsFire(false);
      if (finallyHandler) {
        finallyHandler();
      }
    }
  }

  useEffect(() => {
    if (isFire) {
      request();
    }
  }, [isFire])

  return [data, isLoading, status, setIsFire] as const;
}

export default useAxios