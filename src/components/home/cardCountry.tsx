import { GroupFishOfCity } from 'src/services/fish'
import 'src/styles/pages/home/card-country.scss'
import { BsArrowDownRightCircleFill, BsArrowUpRightCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { uppercaseFirstWord } from 'src/helper'
import moment from 'moment'

interface CardCountryProps {
    fish: GroupFishOfCity
}

interface TopFish {
    komoditas: string
    price: number
}

const CardCountry = ({ fish }: CardCountryProps) => {
    const averagePrice = (fish.price.reduce((total, price) => total + price, 0) / fish.price.length / 1000)
    const currentPrice = fish.price[fish.price.length - 1]
    const prevPrice = fish.price[fish.price.length - 2] ?? currentPrice
    const percentagePrice = Math.abs(currentPrice - prevPrice) / (currentPrice > prevPrice ? currentPrice : prevPrice) * 100
    const topFishs = Object.keys(fish.komoditas)
        .map(index => parseInt(index))
        .reduce((prevFish: TopFish[], index) => prevFish.find(({ komoditas }) => komoditas === fish.komoditas[index]) ? prevFish : [
            ...prevFish,
            {
                komoditas: fish.komoditas[index],
                price: fish.price[index],
            }
        ], [])
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)

    const TopFishs = () => {
        return (
            <>
                {topFishs.map((data, index) => (
                    <div className='fish row align-items-center'>
                        <div className="rank">{index + 1}</div>
                        <h6>{uppercaseFirstWord(data.komoditas.toLowerCase())}</h6>
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className='card-country column'>
            <h4 className='title'>Ikan Kota {fish.area_kota}</h4>
            <div className="row align-items-center">
                <h1 className='price'>{averagePrice.toFixed(averagePrice % 1 === 0 ? 0 : 1)}K</h1>
                <div className="column wrap-fish">
                    <TopFishs />
                </div>
            </div>
            <div className="row align-items-center footer">
                <div className={`row ${currentPrice === prevPrice ? 'stable' : currentPrice < prevPrice ? 'down' : 'up'}`}>
                    {
                        currentPrice === prevPrice ?
                            <BsArrowRightCircleFill className='icon-percentage' />
                            : currentPrice < prevPrice ?
                                <BsArrowDownRightCircleFill className='icon-percentage' />
                                : <BsArrowUpRightCircleFill className='icon-percentage' />
                    }
                    <h1 className='percentage'>{percentagePrice.toFixed(percentagePrice % 1 === 0 ? 0 : 1)}%</h1>
                </div>
                <h6 className='current-date'>
                    <span>Data Terakhir</span>
                    <br />
                    {moment(fish.timestamp[fish.timestamp.length - 1]).format('MMMM DD YYYY hh:mm')}
                </h6>
            </div>
        </div>
    )
}

export default CardCountry