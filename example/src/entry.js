import React from 'react';
import ReactDOM from 'react-dom';

import Example from './Example.md';

ReactDOM.render(
	<Example
		clickExample={() => alert('clicked!')}
		parentProp="a prop that has been added in 'example/src/entry.js'"
	/> ,
	document.getElementById('app')
);