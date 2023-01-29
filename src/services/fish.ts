import { Overwrite, uppercaseFirstWord } from 'src/helper'
import {FishType} from 'src/hooks/useFishs'
import moment from 'moment'

type GroupFishOfCity = Overwrite<FishType, {
    komoditas: string[],
    price: number[]
    size: number[],
    tgl_parsed: string[],
    timestamp: string[]
}>

type RankFish = {
    id: string;
    last_price: number;
    average_size: number;
    average_price: number;
    last_update: string;
}

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
        mainData.timestamp.push(moment(data.timestamp).format('MMMM DD YYYY hh:mm'))

        return prevData.map(prevData => {
            if (prevData.uuid === mainData.uuid) return mainData
            return prevData
        })
    }
    
    return [
        ...prevData, 
        {
            ...data, 
            komoditas: [data.komoditas], 
            price: [data.price], 
            size: [data.size], 
            tgl_parsed: [data.tgl_parsed], 
            timestamp: [moment(data.timestamp).format('MMMM DD YYYY hh:mm')]
        }
    ]
}, [])
.map(data => ({
    ...data, 
    area_kota: uppercaseFirstWord(data.area_kota), 
    area_provinsi: uppercaseFirstWord(data.area_provinsi)
}))

const getRankFish = (fishs: FishType[] | undefined) => {
    if (!fishs) return [];
    const groubFish = fishs.map(data => ({...data, komoditas: data.komoditas.toLowerCase()}))
    .reduce((prevData: {[key: string]: FishType[]}, data) => ({...prevData, [data.komoditas]: [...(prevData[data.komoditas] ?? []), data]}), {})

    return Object.keys(groubFish).map<RankFish>(fish => {
        const averageSize = groubFish[fish].reduce((prevData, {size}) => prevData + size, 0) / groubFish[fish].length
        const averagePrice = groubFish[fish].reduce((prevData, {price}) => prevData + price, 0) / groubFish[fish].length

        return {
            id: uppercaseFirstWord(fish),
            last_price: groubFish[fish][0].price,
            average_size: averageSize,
            average_price: averagePrice,
            last_update: moment(groubFish[fish][0].timestamp).format('MMMM DD YYYY hh:mm')
        }
    })
    .sort((a, b) => b.last_price - a.last_price)
    .slice(0, 10)
}

export type {
    GroupFishOfCity,
    RankFish,
}
export {
    getGroupFishOfCity,
    getRankFish
}