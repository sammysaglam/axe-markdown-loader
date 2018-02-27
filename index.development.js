module.exports = function loader(markdownRaw) {

	console.warn('Using development version of axe-markdown-loader');

	// async loader
	var callback = this.async();

	// load markdown builders
	var parse = require('./src/parse').parse;
	var buildComponent = require('./src/buildComponent').buildComponent;

	// parse
	parse(markdownRaw).then(componentData => callback(null , buildComponent(componentData))).catch(callback);
};