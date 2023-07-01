import React from 'react'
import Logo from './../../static/logo.svg';
import './Header.css';

import { BiHome } from 'react-icons/bi';
import { BiDonateHeart } from 'react-icons/bi';
import { VscGithubAlt } from 'react-icons/vsc';

export default function Header() {
    return (
        <React.Fragment>
            <header>
                <div className="left">
                    <img draggable="false" src={Logo} alt="" />
                </div>
                <div className="right">
                    <ul>
                        {/* <li>
                            <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </li> */}
                        <li><a href="./"><BiHome /></a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/surya0"><BiDonateHeart /></a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/suryapratapsinghsuryavanshi/markdown-to-pdf"><VscGithubAlt /></a></li>
                    </ul>
                </div>
            </header>
        </React.Fragment>
    );
}
