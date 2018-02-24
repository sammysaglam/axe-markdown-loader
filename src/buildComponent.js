const fs = require('fs');
const path = require('path');

const reduce = require('reduce-object');

const moduleImports = fs.readFileSync(path.join(__dirname, '/imports/imports.js'), 'utf8') + '\n\n';
const Component = fs.readFileSync(path.join(__dirname, '/components/MarkdownComponent.js'), 'utf8') + '\n\n';
const HtmlStyleTag = fs.readFileSync(path.join(__dirname, '/components/HtmlStyleTag.js'), 'utf8') + '\n\n';

const destructureNonDefaultImports = imports => imports.replace(/({[^}]+})/g, '...($1)');
const aliasImports = imports => imports.replace(/[^,{]+as\s+([^\s]+)/g, ' $1');

module.exports = {
	buildComponent: component => {

		const { imports, ...attributes } = component.attributes;

		const userImportsString =

			reduce(imports, (concatenated, packageName, moduleName) => concatenated + `import ${moduleName} from '${packageName}';\n`, '')

			+

			`const importedComponents = {\n${
				reduce(imports, (concatenated, packageName, moduleName) => concatenated + `\t${
					aliasImports(destructureNonDefaultImports(moduleName))
					} ,\n`, '')
				}};`

		;

		return (

			moduleImports

			+

			userImportsString

			+

			Component.replace(/\[__GET_MARKDOWN_JSX__]/, component.jsx)

			+

			HtmlStyleTag

		);
	}
};