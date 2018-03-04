export default class MarkdownComponent extends React.Component {
	constructor(props) {
		super(props);

		this.addLineNumbers = this.addLineNumbers.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.addLineNumbers);
		this.addLineNumbers();
	}

	componentWillUnmout() {
		window.removeEventListener('resize', this.addLineNumbers);
	}

	componentDidUpdate() {
		this.addLineNumbers();
	}

	addLineNumbers() {

		setTimeout(() => {

			if ( !this.rootElement ) return false;

			const NEW_LINE_EXP = /\n(?!$)/g;

			const elements = [...this.rootElement.querySelectorAll('.axe-markdown__render-source--with-line-numbers')];

			elements.forEach(element => {

				const lines = element.textContent.split(NEW_LINE_EXP);
				const lineCount = (lines.length + 1) || 0;

				const newLineNumbersWrapper = document.createElement('span');
				newLineNumbersWrapper.setAttribute('aria-hidden', 'true');
				newLineNumbersWrapper.className = 'line-numbers-rows';
				newLineNumbersWrapper.innerHTML = new Array(lineCount).join('<span></span>');

				if (element.querySelectorAll('.line-numbers-rows').length === 0) {
					element.getElementsByTagName('code')[0].appendChild(newLineNumbersWrapper);
				}

				const lineNumbersWrapper = element.querySelector('.line-numbers-rows');

				if (element.querySelectorAll('.line-numbers-sizer').length === 0) {
					const newLineNumberSizer = document.createElement('span');
					newLineNumberSizer.className = 'line-numbers-sizer';
					element.getElementsByTagName('code')[0].appendChild(newLineNumberSizer);
				}

				const lineNumberSizer = element.querySelector('.line-numbers-sizer');
				lineNumberSizer.style.display = 'block';

				lines.forEach((line, lineNumber) => {

					lineNumberSizer.textContent = line || '\n';
					const lineSize = lineNumberSizer.getBoundingClientRect().height;

					lineNumbersWrapper.children[lineNumber].style.height = lineSize + 'px';
				});

				lineNumberSizer.textContent = '';
				lineNumberSizer.style.display = 'none';
			});
		}, 1);
	}

	render() {
		const props = this.props;

		return (
			<div className="axe-markdown" ref={rootElement => this.rootElement = rootElement}>
				[__GET_MARKDOWN_JSX__]
			</div>
		);
	}
}