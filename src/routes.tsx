import { Routes as RouteWrap, Route } from 'react-router-dom'
import Home from 'src/pages/home'

const Routes = () => (
	<RouteWrap>
		<Route path='/' element={<Home />} />
		<Route path='/fish-prices' element={<Home />} />
	</RouteWrap>
)

export default Routes
