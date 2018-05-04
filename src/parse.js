const frontMatter = require('front-matter');
const Remarkable = require('remarkable');
const md = new Remarkable({ xhtmlOut: true });

const renderFenceBlock = (tokens, idx) => {

	const options = tokens[idx].params.split(/\s+/g);
	const language = options[0];

	const languageAbbreviations = {
		js: 'javascript',
		css: 'scss',
		md: 'markdown'
	};

	const languageName = languageAbbreviations[language] ? languageAbbreviations[language] : language;

	const { content: sourceCode } = tokens[idx];
	const sourceCodeWithTemplateStringInjectionEnabled = sourceCode.replace(/\$\{/g,'\\\${').replace(/([^\\]|^)\#{/g,'$1${');
	const sourceCodeCustomFenceBlocksReplaced = languageName === "markdown" ? sourceCodeWithTemplateStringInjectionEnabled.replace(/~~~/g, '\\`\\`\\`') : sourceCodeWithTemplateStringInjectionEnabled;
	const processedSourceCode = sourceCodeCustomFenceBlocksReplaced;

	const isRenderableLanguage = (

		languageName === 'html'

		||

		languageName === 'jsx'

		||

		languageName === 'css'

		||

		languageName === 'scss'

		||

		languageName === 'markdown'

		||

		languageName === 'javascript'
	);

	// get render settings
	const showSource = options.includes('show-source') || !isRenderableLanguage;
	const hideRender = options.includes('no-render') || !isRenderableLanguage;
	const hideLineNumbers = options.includes('no-line-numbers');

	return `
		<div
			className={[
				"axe-markdown__render",
				"axe-markdown__render--lang-${languageName}",
				${showSource ? '"axe-markdown__render--with-source"' : 'null'}
				
			].filter(className => className).join(' ')}
		>
			<ExampleRenderer
				initialSource={\`${processedSourceCode}\`}
				languageName="${languageName}"
				showSource={${showSource}}
				parentMarkdownId={id}
				hideLineNumbers={${hideLineNumbers}}
				updateLineNumbers={updateLineNumbers}
				hideRender={${hideRender}}
			/>
		</div>
	`;
};

md.renderer.rules.fence_custom.bash = renderFenceBlock;
md.renderer.rules.fence_custom.json = renderFenceBlock;
md.renderer.rules.fence_custom.html = renderFenceBlock;
md.renderer.rules.fence_custom.jsx = renderFenceBlock;
md.renderer.rules.fence_custom.javascript = renderFenceBlock;
md.renderer.rules.fence_custom.js = renderFenceBlock;
md.renderer.rules.fence_custom.css = renderFenceBlock;
md.renderer.rules.fence_custom.scss = renderFenceBlock;
md.renderer.rules.fence_custom.md = renderFenceBlock;
md.renderer.rules.fence_custom.markdown = renderFenceBlock;
md.renderer.rules.fence_custom.php = renderFenceBlock;

module.exports = {
	parse: markdownRaw => new Promise((resolve, reject) => {

		const markdown = frontMatter(markdownRaw.replace(/\t/g, '   '));

		try {
			const jsx = md.render(markdown.body);
			return resolve({
				jsx,
				attributes: markdown.attributes
			});

		} catch (err) {
			return reject(err);
		}
	})
};