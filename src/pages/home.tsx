import { useRef } from 'react'
import { CardCountry } from 'src/components/home'
import useFishs from 'src/hooks/useFishs'
import { getGroupFishOfCity } from 'src/services/fish'
import 'src/styles/pages/home/home.scss'
import {useDraggable} from 'react-use-draggable-scroll'

const Home = () => {
    const {data} = useFishs()
    const ref = useRef<any>()
    const {events} = useDraggable(ref)
    const groupOfCity = getGroupFishOfCity(data)
    // console.log(groupOfCity)

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
        </div>
    )
}

export default Home