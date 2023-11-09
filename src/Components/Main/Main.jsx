import React, { useEffect, useRef } from 'react'
import './Main.css';
import 'split-pane-react/esm/themes/default.css';

import SplitPane, { Pane, SashContent } from 'split-pane-react';
import { useState } from 'react';
import { BiReset } from 'react-icons/bi'
import { LuSaveAll } from 'react-icons/lu'
import { MdPublishedWithChanges } from 'react-icons/md'
import { MdOutlineSaveAlt } from 'react-icons/md'

import MPreview from '../MarkdownPreview/MPreview';

export default function Main() {
	const [paneSizes, setPaneSizes] = useState([50, 50]);
	const [markdown, setMarkdown] = useState('');
	const [alart, setAlart] = useState("");

	const markRef = useRef(null);

	const alarting = (msg) => {
		setAlart(msg);
		setTimeout(() => {
			setAlart('');
		}, 3000);
	}

	useEffect(() => {
		if(localStorage.getItem('markdowns')) {
			setMarkdown(localStorage.getItem('markdowns'));
		}

		markRef.current.focus();
	}, []);

	return (
		<React.Fragment>
			{alart !== "" && <div className='alart'>{alart}</div>}
			<div className='container'onKeyDown={(key) => {
				if(key.ctrlKey && key.key === 's' || key.ctrlKey && key.key === 'S') {
					key.preventDefault();
					localStorage.setItem('markdowns', markdown);
					alarting('Markdowns Saved');
				}

				if(key.ctrlKey && key.key === 'd' || key.ctrlKey && key.key === 'D') {
					setMarkdown('');
					localStorage.removeItem('markdowns');
				}

				if(key.ctrlKey && key.key === 'p' || key.ctrlKey && key.key === 'P') {
					var divContents = document.getElementsByClassName('preview')[0].innerHTML;
					var a = window.open('', '', 'height=fit, width=fit');
					if(a) {
						a.document.write('<html>');
						a.document.write('<head><link rel="stylesheet" href="./print.css"></head>');
						a.document.write('<body>');
						a.document.write(divContents);
						a.document.write('<a id="branding" title="https://mpdf.tech/" role="link" target="_blank" rel="noopener noreferrer nofollow" class="text-bold" href="https://mpdf.tech/"><img src="/fav.svg"/><p>mpdf.tech</p></a>');
						a.document.write('<script src="./print.js"></script>');
						a.document.write('</body></html>');
						a.document.close();
						a.name = 'mpdf';
					}
				}
			}}>
				<div className='main'>
					<SplitPane
						sizes={paneSizes}
						onChange={(sizes) => setPaneSizes(sizes)}
						resizerSize={2}
						sashRender={(index, active) => <SashContent style={!active ? {} : {}} />}
					>
						<Pane className='md_left'>
							<button className='collapse-button left' onClick={() => setPaneSizes([0, 100])}>
								<i className='gg-chevron-left'></i>
							</button>
							<textarea
								name='md-edit'
								id='md-edit'
								cols='30'
								rows='10'
								onChange={(e) => {
									setMarkdown(e.target.value);
								}}
								value={markdown}
								placeholder='Write Markdown'
								ref={markRef}
							></textarea>
						</Pane>
						<Pane className='md_right'>
							<button className='collapse-button right' onClick={() => setPaneSizes([100, 0])}>
								<i className='gg-chevron-left'></i>
							</button>
							<MPreview code={markdown} />
						</Pane>
					</SplitPane>
				</div>
				<div className='bottom'>
					<button id='reset' onClick={(e) => {
						setMarkdown('');
						localStorage.removeItem('markdowns');
					}}>
						<BiReset/>
					</button>
					<button onClick={(e) => {
						e.preventDefault();
						localStorage.setItem('markdowns', markdown);
						alarting('Markdowns Saved');
					}} id='save'><LuSaveAll/></button>
					<button id='resize' onClick={(e) => {
						setPaneSizes([50, 50])
						document.querySelector('.split-sash-content').style.backgroundColor = "rgba(0, 0, 0, 0.377)";
						setTimeout(() => {
							document.querySelector('.split-sash-content').style.backgroundColor = "transparent";
							console.log('done');
						}, 700);
					}}>
						<i className='gg-compress'></i>
					</button>
					<a href='https://preserve.ml/'><button id='publish'><MdPublishedWithChanges/></button></a>
					<button
						id='prin'
						onClick={(e) => {
							var divContents = document.getElementsByClassName('preview')[0].innerHTML;
							var a = window.open('', '', 'height=fit, width=fit');
							if(a) {
								a.document.write('<html>');
								a.document.write('<head><link rel="stylesheet" href="./print.css"></head>');
								a.document.write('<body>');
								a.document.write(divContents);
								a.document.write('<a id="branding" title="https://mpdf.tech/" role="link" target="_blank" rel="noopener noreferrer nofollow" class="text-bold" href="https://mpdf.tech/"><img src="/fav.svg"/><p>mpdf.tech</p></a>');
								a.document.write('<script src="./print.js"></script>');
								a.document.write('</body></html>');
								a.document.close();
								a.name = 'mpdf';
							}
						}}
					>
						<MdOutlineSaveAlt/>
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
