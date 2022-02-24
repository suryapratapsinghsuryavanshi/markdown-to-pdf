import react, { useState } from 'react';
import './Main.css';
import MPreview from "../MarkdownPreview/MPreview";

export default function Main() {

    const [markdown, setMarkdown] = useState("");

    return(
        <react.Fragment>
            <div className="container">
                <div className="main">
                    <div className="md_left">
                        <textarea name="md-edit" id="md-edit" cols="30" rows="10" onChange={(e) => {
                            setMarkdown(e.target.value);
                        }}
                        value={markdown}
                        placeholder='Write Markdown'
                        >
                        </textarea>
                    </div>
                    <div className="md_right">
                        <MPreview code={markdown}/>
                    </div>
                </div>
                <div className="bottom">
                    <button id="reset" onClick={(e) => {
                        setMarkdown("");
                    }}>Reset</button>
                    <button id="prin" onClick={(e) => {
                        var divContents = document.getElementsByClassName("preview")[0].innerHTML;
                        var a = window.open('', '', 'height=fit, width=fit');
                        a.document.write('<html>');
                        a.document.write('<head><link rel="stylesheet" href="./print.css"></head>');
                        a.document.write('<body>');
                        a.document.write(divContents);
                        a.document.write('</body></html>');
                        a.document.close();
                        a.name("mpdf");
                    }}>Print</button>
                </div>
            </div>   
        </react.Fragment>
    );
}  