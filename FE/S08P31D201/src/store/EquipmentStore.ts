import { EquipmentType } from "EquipmentTypes";
import { atom } from "recoil";

const EquipmentsAtom = atom<EquipmentType[]>({
  key: 'equipsKey',
  default: []
})

export { EquipmentsAtom };