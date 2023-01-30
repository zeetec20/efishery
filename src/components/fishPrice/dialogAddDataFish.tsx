import * as Dialog from '@radix-ui/react-dialog'
import '@radix-ui/colors/blackA.css';
import 'src/styles/pages/fishPrice/dialogAddDataFish.scss'
import Fish from 'src/assets/fish.png'
import { CgClose } from 'react-icons/cg'
import { parseNumberFormatID } from 'src/helper';
import SelectCountryAddData from './selectCountryAddData';
import Button from '../button';
import useCountries from 'src/hooks/useCountries';
import useSizes from 'src/hooks/useSizes';
import SelectSizeAddData from './selectSizeAddData';
import useAddFish from 'src/hooks/useAddFish';
import { v4 as uuid4 } from 'uuid'
import moment from 'moment';
import ToastFormInvalid from './toastFormInvalid';
import { useEffect, useRef, useState } from 'react';

const DialogAddDataFish = ({ onSuccess, ...props }: Dialog.DialogProps & {onSuccess: () => any}) => {
    const { data: countries } = useCountries()
    const { data: sizes } = useSizes()
    const { trigger } = useAddFish()
    const [openToastFormInvalid, setOpenToastFormInvalid] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const priceParser = (number: string) => {
        if (number !== '') number = parseNumberFormatID(parseInt(number.replaceAll('.', '')))
        return number
    }
    const priceValidate = (e: React.KeyboardEvent<HTMLInputElement>) => Number.isFinite(parseInt(e.key)) || e.key === 'Backspace' ? null : e.preventDefault()
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let { fish, price, country, size } = Object.fromEntries(new FormData(e.target as HTMLFormElement))

        fish = fish.toString().replace(/\s\s+/g, ' ')
        const isFishValidated = /([^\s])/.test(fish)

        price = price.toString().replaceAll('.', '')
        const isPriceValidated = parseInt(price)

        const isCountryValidated = country !== ''
        const isSizeValidated = size !== ''
        const now = moment.now()

        if (!(isFishValidated && isPriceValidated && isCountryValidated && isSizeValidated)) {
            setOpenToastFormInvalid(false)
            setTimeout(() => {
                setOpenToastFormInvalid(true)
            }, 100);            
        }

        await trigger({
            uuid: uuid4(),
            komoditas: fish,
            price: parseInt(price),
            area_kota: JSON.parse(country.toString()).city,
            area_provinsi: JSON.parse(country.toString()).province,
            size: parseInt(size.toString()),
            tgl_parsed: moment(now).toISOString(),
            timestamp: now
        })
        onSuccess()
    }

    useEffect(() => {
        return formRef.current?.reset()
    }, [])

    return (
        <>
            <Dialog.Root {...props}>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content dialog-add-data-fish">
                        <Dialog.Close asChild>
                            <CgClose className='icon-close' />
                        </Dialog.Close>
                        <div className="row">
                            <div className="wrap-icon-fish">
                                <img src={Fish} alt="Logo Ikan" className='icon-fish' />
                            </div>
                            <div className="column information">
                                <h1>Harga Ikan</h1>
                                <p>Tambahkan harga ikan paling update hari ini</p>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} ref={formRef}>
                            <div className="wrap-input">
                                <label htmlFor="fish">Ikan</label>
                                <input type="text" id='fish' name='fish' placeholder='Ikan' />
                            </div>
                            <div className="wrap-input">
                                <label htmlFor="price">Harga</label>
                                <input type="text" id='price' name='price' placeholder='Harga' onKeyDown={priceValidate} onChange={e => e.target.value = priceParser(e.target.value)} />
                            </div>
                            <div className="row">
                                <div className="wrap-input">
                                    <label htmlFor="country">Kota</label>
                                    <SelectCountryAddData countries={countries} />
                                </div>
                                <div className="wrap-input">
                                    <label htmlFor="size">Ukuran</label>
                                    <SelectSizeAddData sizes={sizes} />
                                </div>
                            </div>
                            <div className="row actions">
                                <Dialog.Close asChild>
                                    <Button className='btn-cancel'>Batal Tambah</Button>
                                </Dialog.Close>
                                <Button type='submit' className='btn-submit'>Tambah Harga</Button>
                            </div>
                        </form>

                    </Dialog.Content>
                    <ToastFormInvalid open={openToastFormInvalid} setOpen={setOpenToastFormInvalid} />
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default DialogAddDataFish