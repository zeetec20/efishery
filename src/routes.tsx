import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from 'src/pages/home'

const Routes = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />
		}
	])

	return (
		<RouterProvider router={router} />
	)
}

export default Routes;
