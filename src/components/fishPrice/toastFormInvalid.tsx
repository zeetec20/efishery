import * as Toast from '@radix-ui/react-toast';
import 'src/styles/pages/fishPrice/toastFormInvalid.scss'
import { BsExclamation } from 'react-icons/bs'

interface ToastFormInvalidProps {
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ToastFormInvalid = ({ open, setOpen }: ToastFormInvalidProps) => {
	return (
		<Toast.Provider swipeDirection="right">
			<Toast.Root className="toast-form-invalid" open={open} onOpenChange={setOpen}>
				<Toast.Title className="toast-title">
					<div className="wrap-icon">
						<BsExclamation className='icon' />
					</div>
					Tambah Harga Ikan
				</Toast.Title>
				<Toast.Description asChild>
					<div className="toast-description">
						Sebelum menambahkan harga ikan, silahkan lengkapi form dengan benar
					</div>
				</Toast.Description>
			</Toast.Root>
			<Toast.Viewport className="toast-viewport" />
		</Toast.Provider>
	);
};

export default ToastFormInvalid;