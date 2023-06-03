import React from 'react'
import './Main.css';
import 'split-pane-react/esm/themes/default.css';

import SplitPane, { Pane, SashContent } from 'split-pane-react';
import { useState } from 'react';

import MPreview from '../MarkdownPreview/MPreview';

export default function Main() {
	const [paneSizes, setPaneSizes] = useState([50, 50]);
	const [markdown, setMarkdown] = useState('');

	return (
		<React.Fragment>
			<div className='container'>
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
					<button id='reset' onClick={(e) => setMarkdown('')}>
						Reset
					</button>
					<button onClick={(e) => setPaneSizes([50, 50])}>
						<i className='gg-compress'></i>
					</button>
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
								a.document.write('<script src="./print.js"></script>');
								a.document.write('</body></html>');
								a.document.close();
								a.name = 'mpdf';
							}
						}}
					>
						Print
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
