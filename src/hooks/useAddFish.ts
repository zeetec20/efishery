import useSWRMutation from 'swr/mutation'
import { fetcher } from '~/helper'
import { FishType } from './useFishs'

const useAddFish = () => {
    const addFishFetcher = (url: string, {arg}: {arg: string}) => fetcher(url, {method: 'POST', body: arg})
    const {data, trigger, ...res} = useSWRMutation('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list', addFishFetcher)
    const add = (fish: FishType) => trigger(JSON.stringify(fish))
    return {data, trigger: add, ...res}
}

export default useAddFish