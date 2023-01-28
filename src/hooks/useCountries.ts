import useSWR from 'swr'
import { fetcher } from 'src/helper'

interface CountryType {
    province: string,
    city: string,
}

const useCountries = () => {
    const {data, ...res} = useSWR<any[]>('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area', fetcher)
    const newData: CountryType[] | undefined = data?.filter(data => {
        if (data.province && data.city) return false
          return true
    }).reduce((prevData: CountryType[], data: CountryType) => prevData.find(({province, city}) => province === data.province && city === data.city) ? prevData : [...prevData, data], [])
    return {data: newData, ...res}
}

export type {
    CountryType
}
export default useCountries