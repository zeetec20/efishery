import useSWR from 'swr'
import { fetcher } from '~/helper'

interface SizeType {
    size: number
}

const useSizes = () => {
    const {data, ...res} = useSWR<any[]>('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size', fetcher)
    const newData: SizeType[] | undefined = data?.map(data => {
        data = parseInt(data.size)
        return data
    })
    return {data: newData, ...res}
}

export type {
    SizeType
}
export default useSizes