import ReactDOM from 'react-dom/client';
import React from 'react';
import Routes from './routes';
import Layout from './layout';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(
	<React.StrictMode>
		<Layout>
			<Routes />
		</Layout>
	</React.StrictMode>
)
