import * as Toast from '@radix-ui/react-toast';
import 'src/styles/pages/fishPrice/toastSuccessAddFish.scss'
import { BsExclamation } from 'react-icons/bs'

interface ToastSuccessAddFishProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ToastSuccessAddFish = ({ open, setOpen }: ToastSuccessAddFishProps) => {
    return (
        <Toast.Provider swipeDirection="right">
            <Toast.Root className="toast-success-add-fish" open={open} onOpenChange={setOpen}>
                <Toast.Title className="toast-title">
                    <div className="wrap-icon">
                        <BsExclamation className='icon' />
                    </div>
                    Tambah Harga Ikan
                </Toast.Title>
                <Toast.Description asChild>
                    <div className="toast-description">
                        Anda telah berhasil menambahkan harga baru ikan
                    </div>
                </Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="toast-viewport" />
        </Toast.Provider>
    );
};

export default ToastSuccessAddFish;