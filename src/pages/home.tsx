import { useRef } from 'react'
import { CardCountry } from 'src/components/home'
import useFishs from 'src/hooks/useFishs'
import { getGroupFishOfCity, getRankFish } from 'src/services/fish'
import 'src/styles/pages/home/home.scss'
import {useDraggable} from 'react-use-draggable-scroll'
import TableRankFish from 'src/components/home/tableRankFish'

const Home = () => {
    const {data} = useFishs()
    const ref = useRef<any>()
    const {events} = useDraggable(ref)
    const groupOfCity = getGroupFishOfCity(data)
    const rankFish = getRankFish(data)

    console.log('refresh home')
    const ListCardCity = () => (
        <>
            {groupOfCity?.map(data => <CardCountry fish={data} key={data.uuid} />) ?? []}
        </>
    )

    return (
        <div className='home'>
            <div className="wrap-card-city" {...events} ref={ref}>
                <ListCardCity />
            </div>
            <TableRankFish rankFish={rankFish} />
        </div>
    )
}

export default Home