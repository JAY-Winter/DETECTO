import axios from 'axios'
import React from 'react'

function useAxios() {
  const instance = axios.create({
    baseURL: '/',
    timeout: 5000,
  })

  return instance;
}

export default useAxios