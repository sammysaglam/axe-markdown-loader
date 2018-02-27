const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin('example.css');

module.exports = [
	{
		entry: {
			parse: './src/parse.js',
			buildComponent: './src/buildComponent.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			libraryTarget: 'commonjs'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		},
		externals: {
			'front-matter': 'front-matter',
			'node-sass': 'node-sass',
			'reduce-object': 'reduce-object',
			'remarkable': 'remarkable'
		}
	},
	{
		entry: [
			'./example/src/entry.js',
			'./example/src/entry.scss'
		],
		output: {
			path: path.join(__dirname, 'example'),
			filename: 'example.js'
		},
		module: {
			rules: [
				{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
				{ test: /\.md/, exclude: /node_modules/, loader: ['babel-loader', 'axe-markdown-loader'] },
				{
					test: /\.(scss)$/,
					loader: extractCss.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									root: './'
								}
							},
							'sass-loader'
						]
					}),
					exclude: /themes/
				}
			]
		},
		plugins: [
			extractCss
		],
		resolve: {
			alias: {
				'axe-markdown-loader': path.resolve(__dirname)
			}
		},
		resolveLoader: {
			alias: {
				'axe-markdown-loader': path.join(__dirname, 'index.development')
			}
		}
	}
];