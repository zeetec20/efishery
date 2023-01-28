import { Overwrite, uppercaseFirstWord } from 'src/helper'
import {FishType} from 'src/hooks/useFishs'

type GroupFishOfCity = Overwrite<FishType, {
    komoditas: string[],
    price: number[]
    size: number[],
    tgl_parsed: string[],
    timestamp: number[]
}>

const getGroupFishOfCity = (fishs: FishType[] | undefined) => fishs?.map(data => ({
    ...data, 
    area_kota: data.area_kota.toLowerCase(), 
    area_provinsi: data.area_provinsi.toLowerCase()
}))
.reduce((prevData: GroupFishOfCity[], data: FishType) => {
    const mainData = prevData.find(({area_kota, area_provinsi}) => area_kota === data.area_kota && area_provinsi === data.area_provinsi)
    if (mainData) {
        mainData.komoditas.push(data.komoditas)
        mainData.price.push(data.price)
        mainData.size.push(data.size)
        mainData.tgl_parsed.push(data.tgl_parsed)
        mainData.timestamp.push(data.timestamp)

        return prevData.map(prevData => {
            if (prevData.uuid === mainData.uuid) return mainData
            return prevData
        })
    }
    
    return [...prevData, {...data, komoditas: [data.komoditas], price: [data.price], size: [data.size], tgl_parsed: [data.tgl_parsed], timestamp: [data.timestamp]}]
}, [])
.map(data => ({
    ...data, 
    area_kota: uppercaseFirstWord(data.area_kota), 
    area_provinsi: uppercaseFirstWord(data.area_provinsi)
}))


export type {
    GroupFishOfCity
}
export {
    getGroupFishOfCity
}