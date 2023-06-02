import './global.css';

import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import React from 'react'

export default function App() {
	return (
		<React.Fragment>
			<div className='app'>
				<Header />
				<Main />
			</div>
		</React.Fragment>
	);
}
