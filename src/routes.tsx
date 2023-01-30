import { Routes as RouteWrap, Route } from 'react-router-dom'
import Home from 'src/pages/home'
import FishPrice from 'src/pages/fishPrice'

const Routes = () => (
	<RouteWrap>
		<Route path='/' element={<Home />} />
		<Route path='/harga-ikan' element={<FishPrice />} />
	</RouteWrap>
)

export default Routes
