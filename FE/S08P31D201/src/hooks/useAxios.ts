import { useAxiosParmas } from "AxiosRequest";
import axios from "axios"
import { useEffect, useState } from "react"

// isFire, 요청객체(메소드, 세부 요청 url, 실어보낼 데이터), 요청 메소드, 에러 핸들러, finally 메소드를 입력 받음
function useAxios({ isFire, requestObj, tryHandler, catchHandler, finallyHandler }: useAxiosParmas) {
  // 데이터, 로딩 상태, 데이터, 응답 코드
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
    } catch {

    } finally {

    }
  }

  useEffect(() => {
    if (isFire) {
      request();
    }
  }, [isFire])

  return [data, isLoading, status]
}

export default useAxios