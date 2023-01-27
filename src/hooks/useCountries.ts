import useSWR from 'swr'
import { fetcher } from '~/helper'

interface CountryType {
    province: string,
    city: string,
}

const useCountries = () => {
    const {data, ...res} = useSWR<any[]>('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area', fetcher)
    const newData: CountryType[] | undefined = data?.filter(data => {
        if (data.province && data.city) return false
        return true
    })
    return {data: newData, ...res}
}

export type {
    CountryType
}
export default useCountries