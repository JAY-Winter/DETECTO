// 보호구 장비에 대한 타입 선언
declare module 'EquipmentTypes' {
  export type EquipmentType = {
    name: string;
    description: string;
    url: string;
    type: number;
    able: boolean;
    epoch: number;
    training: boolean;
  };
}
