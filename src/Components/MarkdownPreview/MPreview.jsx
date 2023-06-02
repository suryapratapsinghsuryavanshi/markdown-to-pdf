import React from 'react'
import "./MPreview.css";
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Footer(props) {
    return(
        <React.Fragment>
            <div className="preview">
                <MarkdownPreview source={ props.code === "" ? "Markdown Preview" : props.code } />
            </div>
        </React.Fragment>
    );
}