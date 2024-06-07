import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

import 'ace-builds/src-noconflict/worker-html';
import 'ace-builds/src-noconflict/worker-css';
import 'ace-builds/src-noconflict/worker-javascript';

function Codedisplay() {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const iframe = document.getElementById('preview-frame');
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `);
      iframeDoc.close();
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const saveCode = () => {
    console.log('Code saved!');
  };

  return (
    <div className="codeBody">
      <div className="editorContainer">
        <h3>HTML</h3>
        <AceEditor
          mode="html"
          theme="github"
          value={htmlCode}
          onChange={(newValue) => setHtmlCode(newValue)}
          name="html-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="100px"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>

      <div className="editorContainer">
        <h3>CSS</h3>
        <AceEditor
          mode="css"
          theme="github"
          value={cssCode}
          onChange={(newValue) => setCssCode(newValue)}
          name="css-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="100px"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>

      <div className="editorContainer">
        <h3>JavaScript</h3> {/* Corrected closing tag */}
        <AceEditor
          mode="javascript"
          theme="github"
          value={jsCode}
          onChange={(newValue) => setJsCode(newValue)}
          name="js-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="100px"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>

      <div className="previewContainer">
        <h3>Preview</h3>
        <iframe
          id="preview-frame"
          title="code-preview"
          width="100%"
          height="300px"
          frameBorder="0"
        />
      </div>
    </div>
  );
}

export default Codedisplay;
