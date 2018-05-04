const fs = require('fs');
const path = require('path');

const reduce = require('reduce-object');

const moduleImports = fs.readFileSync(path.join(__dirname, '/imports/imports.js'), 'utf8') + '\n\n';
const MarkdownComponent = fs.readFileSync(path.join(__dirname, '/components/MarkdownComponent.js'), 'utf8') + '\n\n';
const ExampleRendererComponent = fs.readFileSync(path.join(__dirname, '/components/ExampleRenderer.js'), 'utf8') + '\n\n';
const PropsTableComponent = fs.readFileSync(path.join(__dirname, '/components/PropsTable.js'), 'utf8') + '\n\n';
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
				}
			};

			window.AxeMarkdownModules = {
				...window.AxeMarkdownModules ,
				userImports: {
					...window.AxeMarkdownModules.userImports,
					...importedComponents
				}
			}
			`

		;

		return (

			moduleImports

			+

			userImportsString

			+

			MarkdownComponent.replace(/\[__GET_MARKDOWN_JSX__]/, component.jsx)
			                 .replace(/<p>\[PROPS_TABLE\(([^)]+)\)]<\/p>/,'<PropsTable component={$1} />')

			+

			ExampleRendererComponent

			+

			PropsTableComponent

			+

			HtmlStyleTag

		);
	}
};