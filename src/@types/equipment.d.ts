// 보호구 장비에 대한 타입 선언
declare module "EquipmentTypes" {
	export type EquipmentType = {
		id: number,
    name: string,
    desc: string,
    img: string,
    isActive: boolean
	}
}