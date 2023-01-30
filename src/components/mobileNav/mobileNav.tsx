import { MdSpaceDashboard, MdTableChart } from 'react-icons/md'
import { useMatch, useNavigate } from 'react-router-dom'
import 'src/styles/components/mobileNav/mobileNav.scss'

const MobileNav = () => {
    const navigate = useNavigate()

    const navigateTo = (url: string) => () => navigate(url)

    return (
        <div className="mobile-nav">
            <div className="column nav">
                <MdSpaceDashboard className={`icon ${useMatch({path: '/'}) ? 'active' : ''}`} onClick={navigateTo('/')} />
                <h1 className={useMatch({path: '/'}) ? 'active' : ''} onClick={navigateTo('/')}>Dashboard</h1>
            </div>
            <div className="column nav">
                <MdTableChart className={`icon ${useMatch({path: '/harga-ikan'}) ? 'active' : ''}`} onClick={navigateTo('/harga-ikan')} />
                <h1 className={useMatch({path: '/harga-ikan'}) ? 'active' : ''} onClick={navigateTo('/harga-ikan')}>Harga Ikan</h1>
            </div>
        </div>
    )
}

export default MobileNav