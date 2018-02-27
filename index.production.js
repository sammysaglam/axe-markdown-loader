module.exports = function loader(markdownRaw) {

	// async loader
	var callback = this.async();

	// load markdown builders
	var parse = require('./dist/parse').parse;
	var buildComponent = require('./dist/buildComponent').buildComponent;

	// parse
	parse(markdownRaw).then(componentData => callback(null , buildComponent(componentData))).catch(callback);
};