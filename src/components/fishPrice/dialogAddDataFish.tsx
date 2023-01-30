import * as Dialog from '@radix-ui/react-dialog'
import '@radix-ui/colors/blackA.css';
import 'src/styles/pages/fishPrice/dialogAddDataFish.scss'
import Fish from 'src/assets/fish.png'
import { CgClose } from 'react-icons/cg'
import { parseNumberFormatID } from 'src/helper';
import SelectCountryAddData from './selectCountryAddData';
import Button from '../button';

const DialogAddDataFish = ({ ...props }: Dialog.DialogProps) => {
    const priceParser = (number: string) => {
        if (number !== '') number = parseNumberFormatID(parseInt(number.replaceAll('.', '')))
        return number
    }
    const priceValidate = (e: React.KeyboardEvent<HTMLInputElement>) => Number.isFinite(parseInt(e.key)) || e.key === 'Backspace' ? null : e.preventDefault()

    return (
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

                    <form>
                        <div className="wrap-input">
                            <label htmlFor="fish">Nama Ikan</label>
                            <input type="text" id='fish' placeholder='Nama Ikan' required />
                        </div>
                        <div className="wrap-input">
                            <label htmlFor="price">Harga</label>
                            <input type="text" id='price' placeholder='Harga' onKeyDown={priceValidate} onChange={e => e.target.value = priceParser(e.target.value)} required />
                        </div>
                        <div className="row">
                            <div className="wrap-input">
                                <label htmlFor="">Kota</label>
                                <SelectCountryAddData />
                            </div>
                            <div className="wrap-input">
                                <label htmlFor="">Size</label>
                                <SelectCountryAddData />
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
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DialogAddDataFish