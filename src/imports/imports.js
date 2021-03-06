import React from 'react';
import ReactDOM from 'react-dom';
import reduce from 'reduce-object';
import stylis from "stylis";

const buble = require( 'buble');

const Remarkable = require('remarkable');
const md = new Remarkable({ xhtmlOut: true });

if ( !window.AxeMarkdownModules ) {
	const AxeMarkdownModules = {
		core: {
			React,
			ReactDOM
		},
		userImports: {},
		props: {}
	};
	window.AxeMarkdownModules = AxeMarkdownModules;
}

const highlightFenceBlock = (tokens, idx) => {

	const options = tokens[idx].params.split(/\s+/g);
	const language = options[0];

	const { content } = tokens[idx];

	return `<pre class="language-${language}"><code>${content}</code></pre>`;

};

md.renderer.rules.fence_custom.bash = highlightFenceBlock;
md.renderer.rules.fence_custom.json = highlightFenceBlock;
md.renderer.rules.fence_custom.html = highlightFenceBlock;
md.renderer.rules.fence_custom.jsx = highlightFenceBlock;
md.renderer.rules.fence_custom.javascript = highlightFenceBlock;
md.renderer.rules.fence_custom.js = highlightFenceBlock;
md.renderer.rules.fence_custom.css = highlightFenceBlock;
md.renderer.rules.fence_custom.scss = highlightFenceBlock;