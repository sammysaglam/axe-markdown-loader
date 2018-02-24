const frontMatter = require('front-matter');
const Remarkable = require('remarkable');
const md = new Remarkable({ xhtmlOut: true });
const sass = require('node-sass');

const renderFenceBlock = (tokens, idx) => {

	const options = tokens[idx].params.split(/\s+/g);
	const language = options[0];

	const { content } = tokens[idx];

	const languageAbbreviations = {
		js: 'javascript',
		md: 'markdown'
	};

	const languageName = languageAbbreviations[language] ? languageAbbreviations[language] : language;

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
	);

	// get render settings
	const showSource = options.includes('show-source') || !isRenderableLanguage;
	const hideRender = options.includes('no-render') || !isRenderableLanguage;
	const hideLineNumbers = options.includes('no-line-numbers');

	// escape template quotes
	const templateQuotesEscaped = content.replace(/`/g, '\\`');
	const customFenceBlocksReplaced = templateQuotesEscaped.replace(/~~~/g, '\\`\\`\\`');

	const renderResult = hideRender ? '' : (

		(languageName === 'jsx' && (
			`<div className="axe-markdown__render-result"> ${templateQuotesEscaped} </div>`
		))

		||

		(languageName === 'css' && (
			`<HtmlStyleTag content={\`${content}\`} />`
		))

		||

		(languageName === 'scss' && (
			`<HtmlStyleTag content={\`${sass.renderSync({ data: content }).css}\`} />`
		))

		||

		(languageName === 'markdown' && (
			`<div className="axe-markdown__render-result" dangerouslySetInnerHTML={{__html:md.render(\`${customFenceBlocksReplaced}\`)}} />`
		))

		||

		`<div className="axe-markdown__render-result" dangerouslySetInnerHTML={{__html:\`${content}\`}} />`
	);

	// @formatter:off
	return `
		<div
			className={[
				"axe-markdown__render",
				"axe-markdown__render--lang-${languageName}",
				${showSource ? '"axe-markdown__render--with-source"' : 'null'}
				
			].filter(className => className).join(' ')}
		>
			${renderResult}
			
			${showSource ?

				`
					<pre
						className={[
							"axe-markdown__render-source",
							${hideLineNumbers ? 'null' : '"axe-markdown__render-source--with-line-numbers"'}
							
						].filter(className => className).join(' ')}
					>
						<code
							dangerouslySetInnerHTML={{__html:Prism.highlight(
								\`${customFenceBlocksReplaced}\` ,
								Prism.languages.${languageName}
							)}}
						/>
					</pre>
				`

				:

				''

			}
		</div>
	`;
	// @formatter:on
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