import axios from 'axios'

function useAxios() {
  const instance = axios.create({
    baseURL: 'https://rmv8gk970l.execute-api.ap-northeast-2.amazonaws.com/',
    timeout: 5000,
    withCredentials: true
  })
  

  return instance;
}

export default useAxios