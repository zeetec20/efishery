import { useRef } from 'react'
import { CardCountry, CardCountrySkeleton, TableRankFish } from 'src/components/home'
import useFishs from 'src/hooks/useFishs'
import { getGroupFishOfCity, getRankFish } from 'src/services/fish'
import 'src/styles/pages/home/home.scss'
import { useDraggable } from 'react-use-draggable-scroll'
import { Helmet } from 'react-helmet'

const Home = () => {
    const { data } = useFishs()
    const ref = useRef<any>()
    const { events } = useDraggable(ref)
    const groupOfCity = getGroupFishOfCity(data)
    const rankFish = getRankFish(data)

    const ListCardCountry = () => (
        <>
            {
                groupOfCity?.map(data => <CardCountry fish={data} key={data.uuid} />) ??
                [<CardCountrySkeleton />, <CardCountrySkeleton />, <CardCountrySkeleton />, <CardCountrySkeleton />]
            }
        </>
    )

    return (
        <div className='home'>
            <Helmet>
                <title>Efishman</title>
            </Helmet>
            <div className="wrap-card-city" {...events} ref={ref}>
                <ListCardCountry />
            </div>
            <TableRankFish rankFish={rankFish} />
        </div>
    )
}

export default Home