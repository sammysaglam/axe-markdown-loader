import React from 'react';
import ReactDOM from 'react-dom';
import reduce from 'reduce-object';

import 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markdown';

const Remarkable = require('remarkable');
const md = new Remarkable({ xhtmlOut: true });

const highlightFenceBlock = (tokens, idx) => {

	const options = tokens[idx].params.split(/\s+/g);
	const language = options[0];

	const { content } = tokens[idx];

	const prismLanguagesConverter = {
		js: 'javascript'
	};

	return `<pre class="language-${language}"><code>${Prism.highlight(content, Prism.languages[language])}</code></pre>`;

};

md.renderer.rules.fence_custom.bash = highlightFenceBlock;
md.renderer.rules.fence_custom.json = highlightFenceBlock;
md.renderer.rules.fence_custom.html = highlightFenceBlock;
md.renderer.rules.fence_custom.jsx = highlightFenceBlock;
md.renderer.rules.fence_custom.javascript = highlightFenceBlock;
md.renderer.rules.fence_custom.js = highlightFenceBlock;
md.renderer.rules.fence_custom.css = highlightFenceBlock;
md.renderer.rules.fence_custom.scss = highlightFenceBlock;