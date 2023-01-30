import { TableFishPrice } from "src/components/fishPrice"
import useFishs from "src/hooks/useFishs"
import 'src/styles/pages/fishPrice/fishPrice.scss'
import { Helmet } from 'react-helmet'

const FishPrice = () => {
    const { data } = useFishs()

    return (
        <div className="fish-price">
            <Helmet>
                <title>Efishman - Harga Ikan</title>
            </Helmet>
            <TableFishPrice fishs={data} />
        </div>
    )
}

export default FishPrice