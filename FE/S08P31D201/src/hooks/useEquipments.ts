import { EquipmentsAtom } from '@/store/EquipmentStore';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import useAxios from './useAxios';
import { EquipmentType } from 'EquipmentTypes';
import { RequestObj } from 'AxiosRequest';

function useEquipments() {
  const [equipments, setEquipments] = useRecoilState(EquipmentsAtom);
  const [fetchedData, isLoading, setRequestObj] = useAxios({baseURL: 'https://k8d201.p.ssafy.io/api/'});

  // 비동기 요청 함수
  const fetchEquipments = () => {
    const requestObj: RequestObj = {
      url: 'equipment',
      method: 'get'
    }
    setRequestObj(requestObj);
  }

  // Recoil의 equipments가 비어있으면 fetch 요청을 한다
  useEffect(() => {
    if (equipments.length === 0) {
      fetchEquipments();
    }
  }, [])

  // fetch 완료되면 equipments atom 갱신한다
  useEffect(() => {
    if (isLoading === false && fetchedData !== null && 'data' in fetchedData) {
      const equipmentsData = fetchedData.data as EquipmentType[];
      let newEquipments: EquipmentType[] = []
      for (const equipmentData of equipmentsData) {
        newEquipments.push(equipmentData)
      }
      setEquipments(newEquipments);
    }
  }, [fetchedData])

  return [equipments, fetchEquipments] as const;
}

export default useEquipments