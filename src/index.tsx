import ReactDOM from 'react-dom/client';
import React from 'react';
import Routes from 'src/routes';
import Layout from './layout';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Layout>
				<Routes />
			</Layout>
		</BrowserRouter>
	</React.StrictMode>
)

serviceWorkerRegistration.register()