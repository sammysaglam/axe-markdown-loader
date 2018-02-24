const path = require('path');

module.exports = {
	entry:{
		parse:'./src/parse.js' ,
		buildComponent:'./src/buildComponent.js'
	} ,
	output:{
		path:path.resolve(__dirname , 'dist') ,
		filename:'[name].js',
		libraryTarget:'commonjs'
	} ,
	module:{
		rules:[
			{
				test:/\.js$/ ,
				exclude:/node_modules/ ,
				loader:'babel-loader'
			}
		]
	} ,
	externals:{
		'front-matter':'front-matter' ,
		'node-sass':'node-sass' ,
		'reduce-object':'reduce-object' ,
		'remarkable':'remarkable'
	}
};