import './global.css';

import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import react from 'react';

export default function App() {
	return (
		<react.Fragment>
			<div className='app'>
				<Header />
				<Main />
			</div>
		</react.Fragment>
	);
}
