import 'src/styles/components/sidebar/sidebar.scss'
import { MdSpaceDashboard, MdTableChart } from 'react-icons/md'
import Button from './button'
import Logo from 'src/assets/logo.png'
import Title from './title'
import { IoIosArrowDown } from 'react-icons/io'
import Hr from '../hr'
import Avatar from 'src/assets/avatar.png'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div>
                <img src={Logo} alt='Logo EFishMan' className='logo' />

                <Title>Menu</Title>
                <div>
                    <Button route='/' icon={<MdSpaceDashboard className='icon' />} text='Dashboard' />
                    <Button route='/harga-ikan' icon={<MdTableChart className='icon' />} text='Harga Ikan' />
                </div>
            </div>
            <div>
                <Hr />
                <div className="account">
                    <div className="row">
                        <img src={Avatar} className='avatar' alt='Avatar User' />
                        <div className="column">
                            <h6>ACCOUNT</h6>
                            <div className="row">
                                <h5>Firman Lestari</h5>
                                <IoIosArrowDown className='icon-dropdown' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar