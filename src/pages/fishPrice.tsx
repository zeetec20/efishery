import { TableFishPrice } from "src/components/fishPrice"
import useFishs from "src/hooks/useFishs"
import 'src/styles/pages/fishPrice/fishPrice.scss'

const FishPrice = () => {
    const { data } = useFishs()

    return (
        <div className="fish-price">
            <TableFishPrice fishs={data} />
        </div>
    )
}

export default FishPrice