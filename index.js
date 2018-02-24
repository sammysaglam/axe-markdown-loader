var fs = require('fs');
var path = require('path');

module.exports = function loader(markdownRaw) {

	// async loader
	var callback = this.async();

	// load markdown builders
	var parse;
	var buildComponent;

	// determine if loader should work from sources (which contains ES6 javascript, which would not work in < Node v8.6.0)
	if (

		// is axe-framework development environment
		fs.existsSync(path.join(__dirname , '../../../../../../docs/package.json'))

	) {

		console.warn('Warning: Running "markdown-to-react-component-loader" from ES6 sources, this requires Node >= 8.6.0');

		// load from "src" folder
		parse = require('./src/parse').parse;
		buildComponent = require('./src/buildComponent').buildComponent;

	} else {

		// load from compiled ES5 compatible distributables
		parse = require('./dist/parse').parse;
		buildComponent = require('./dist/buildComponent').buildComponent;
	}

	parse(markdownRaw).then(componentData => callback(null , buildComponent(componentData))).catch(callback);
};