import authState from "@/store/authState";
import { RequestObj, useAxiosParmas } from "AxiosRequest";
import axios from "axios"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil";

function useAxios({ tryHandler, catchHandler, finallyHandler }: useAxiosParmas) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestObj, setRequestObj] = useState<RequestObj | null>(null);
  const setIsAuthenticated = useSetRecoilState(authState);

  const request = async (requestObj: RequestObj) => {
    const {url, method, body} = requestObj;
    try {
      setIsLoading(true);
      // axios 객체 생성
      const response = await axios({
        url: url,
        method: method,
        baseURL: 'https://k8d201.p.ssafy.io/api/',
        data: body,
        timeout: 5000,
        withCredentials: true
      })

      // 응답 데이터 설정
      setData(response.data);

      // try 핸들러 수행
      if (tryHandler) {
        tryHandler(response);
      }
      
    } catch(e) {
      setIsLoading(false);
      if (axios.isAxiosError(e)) {
        console.log(e.message);
        // 에러메시지 따라 auth 상태 변경하기
        // setIsAuthenticated(false);

        // error 핸들러 수행
        if (catchHandler) {
          catchHandler(e);
        }
      } else {
        console.error(e)
      }
    } finally {
      setRequestObj(null);  // 요청 처리되면 요청 객체는 null로 초기화
      setIsLoading(false);  // 요청 처리 완료

      // finally 핸들러 수행
      if (finallyHandler) {
        finallyHandler();
      }
    }
  }

  useEffect(() => {
    if (requestObj !== null) {
      request(requestObj);
    }
  }, [requestObj])

  return [data, isLoading, setRequestObj] as const;
}

export default useAxios