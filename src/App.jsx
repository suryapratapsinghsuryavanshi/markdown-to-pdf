import react from 'react';
import './global.css'
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';

export default function App() {
    return(
        <react.Fragment>
            <div className="container">
                <Header/>
                <Main/>
            </div>
        </react.Fragment>
    );
}