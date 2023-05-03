import axios from 'axios'
import React, { useEffect } from 'react'

function useAxios() {
  const instance = axios.create({
    baseURL: 'http://k8d201.p.ssafy.io:8000/',
    timeout: 5000,
  })
  

  return instance;
}

export default useAxios