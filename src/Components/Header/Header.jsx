import react from 'react';
import Logo from './../../static/logo.svg';
import './Header.css';

import { BiHome } from 'react-icons/bi';
import { BiDonateHeart } from 'react-icons/bi';
import { VscGithubAlt } from 'react-icons/vsc';

export default function Header() {
    return(
        <react.Fragment>
            <header>
                <div className="left">
                    <img draggable="false" src={Logo} alt="" />
                </div>
                <div className="right">
                    <ul>
                        <li><a href="./"><BiHome/></a></li>
                        <li><a target="_blank" href="https://www.buymeacoffee.com/surya0"><BiDonateHeart/></a></li>
                        <li><a target="_blank" href="https://github.com/suryapratapsinghsuryavanshi"><VscGithubAlt/></a></li>
                    </ul>
                </div>
            </header>
        </react.Fragment>
    );
}