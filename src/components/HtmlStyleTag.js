class HtmlStyleTag extends React.Component {
	render() {

		const {content} = this.props;

		return ReactDOM.createPortal(
			<style dangerouslySetInnerHTML={{__html:content}}/> ,
			document.head
		);
	}
}