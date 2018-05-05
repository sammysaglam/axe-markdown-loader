const jsxTransform = ({id , parentMarkdownId , source}) => (
    buble.transform(`
        (() => {

            const { React , ReactDOM } = window.AxeMarkdownModules.core;

            ${Object.keys(window.AxeMarkdownModules.userImports).reduce((acc, moduleName) => acc + `\n const ${moduleName} = window.AxeMarkdownModules.userImports['${moduleName}']; `,'')}
            const props = window.AxeMarkdownModules.props[${parentMarkdownId}];

            const Component = <React.Fragment>${source}</React.Fragment>
            
            const renderTarget = document.getElementById("render-result-${id}");
            ReactDOM.render(Component, renderTarget);

        })();
    `).code
);

const javascriptTransform = ({parentMarkdownId , source}) => (
    buble.transform(`
        (() => {

            const { React , ReactDOM } = window.AxeMarkdownModules.core;

            ${Object.keys(window.AxeMarkdownModules.userImports).reduce((acc, moduleName) => acc + `\n const ${moduleName} = window.AxeMarkdownModules.userImports['${moduleName}']; `,'')}
            const props = window.AxeMarkdownModules.props[${parentMarkdownId}];

            ${source}

        })();
    `).code
);

const transpileSource = ({languageName , source, id = null , parentMarkdownId}) => (

    (languageName === "jsx" && jsxTransform({id , source, parentMarkdownId}))

    ||

    (languageName === "javascript" && javascriptTransform({source, parentMarkdownId}))

    ||

    (languageName === "scss" && stylis('', source))

    ||

    (languageName === "markdown" && md.render(source))

    ||

    source
);

let exampleId = 0;
class ExampleRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.id = exampleId++;

        const { parentMarkdownId , languageName , initialSource } = props;
        const processedInitialSource = props.initialSource.replace(/\n$/,'');
        
        this.state = {
            source: processedInitialSource,
            transpiledSource: transpileSource({ languageName , id: this.id , parentMarkdownId , source: processedInitialSource }),
            sourceMutated: false
        }
        
        this.onChange = this.onChange.bind(this);
        this.evalJS = this.evalJS.bind(this);
        this.restoreInitialSource = this.restoreInitialSource.bind(this);
    }
        
    componentDidMount() {
        const { languageName , shouldRunJavaScript } = this.props;
        
        if ( languageName === "jsx" || languageName === "javascript" ) { this.evalJS(); }
    }

    onChange({ newSource }) {
        
        const { languageName , parentMarkdownId , updateLineNumbers } = this.props;
        const { transpiledSource: oldTranspiledSource } = this.state;

        updateLineNumbers();
        
        const transpiledSource = (() => {
            try {
                return transpileSource({languageName , id: this.id , parentMarkdownId , source: newSource});
            } catch (error) {
                console.log('transpilation error:', error);
                return oldTranspiledSource;
            }
        })();
  
        this.setState({
            source: newSource,
            transpiledSource,
            sourceMutated: true
        });
    }

    evalJS({transpiledSource} = {}) {
        const { hideRender } = this.props;
        const { transpiledSource: transpiledSourceFromState } = this.state;

        if ( hideRender ) return false;
    
        try {
            eval(transpiledSource ? transpiledSource : transpiledSourceFromState);
            
        } catch (error) {
            console.log('runtime error:', error);
        }
    }

    componentDidUpdate(prevProps) {
        const {parentMarkdownId , languageName , initialSource} = this.props;
        const {source , sourceMutated} = this.state;

        if (prevProps.initialSource !== initialSource) {
            this.onChange({newSource: initialSource});

            setTimeout(() => {
                this.setState({
                    sourceMutated:false
                })
            });

            return false;
        }

        if (source === initialSource && sourceMutated) {
            setTimeout(() => {
                this.setState({
                    sourceMutated:false
                })
            });
        }

        if ( (languageName === "jsx" || languageName === "javascript") ) {
            try {
                const transpiledSource = transpileSource({languageName , id: this.id , parentMarkdownId , source});
                this.evalJS({transpiledSource});

            } catch (error) {
                console.log('error:', error);
            }
        }
    }

    restoreInitialSource() {
        const {initialSource} = this.props;

        this.onChange({newSource: initialSource})

        setTimeout(() => {
            this.setState({
                sourceMutated:false
            })
        });
    }

    render() {
        const { languageName , showSource , hideLineNumbers , hideRender } = this.props;
        const { source, transpiledSource, sourceMutated } = this.state;
        const { id , onChange , restoreInitialSource } = this;

        return (
            <div>
                {!hideRender && (
                    (languageName === "jsx" && <JSXRenderResult id={id} innerRef={element => this.renderWrapper = element} />)

                    ||

                    (languageName === "scss" && <HtmlStyleTag content={transpiledSource} />)

                    ||

                    (languageName === "markdown" && <div className="axe-markdown__render-result" dangerouslySetInnerHTML={{ __html: transpiledSource }} />)

                    ||

                    (languageName === "html" && <div className="axe-markdown__render-result" dangerouslySetInnerHTML={{ __html: transpiledSource }} />)
                )}

                {showSource && (
                    <div style={{position: 'relative'}}>
                        {sourceMutated && <button className="axe-markdown__restore-source" onClick={restoreInitialSource} style={{position:'absolute', right:3, top:4, zIndex:2}}>Restore Source</button>}
                        <pre
                            className={[
                                "axe-markdown__render-source",
                                hideLineNumbers ? null : 'axe-markdown__render-source--with-line-numbers',
                                hideLineNumbers ? null : 'axe-markdown__render-source--line-numbers-padding'
                            ].filter(className => className).join(' ')}
                        >
                            <code
                                style={{pointerEvents:'none' , background:'none'}}
                                dangerouslySetInnerHTML={{ __html: Prism.highlight(source, Prism.languages[languageName]) }}
                            />
                        </pre>
                        <textarea
                            className={[
                                "axe-markdown__render-source",
                                hideLineNumbers ? null : 'axe-markdown__render-source--line-numbers-padding'
                            ].filter(className => className).join(' ')}
                            onChange={({ target: { value } }) => onChange({ newSource: value })}
                            value={source}
                            disabled={hideRender}
                            style={{
                                color:'transparent',
                                position:'absolute',
                                left:0,
                                top:0,
                                zIndex:1,
                                background:"none",
                                outline:"none",
                                border:"none",
                                width:"100%",
                                height:"100%",
                                resize: 'none',
                                overflow:'hidden'
                            }}
                            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                            onKeyDown={event => {
                                
                                const textareaElement = event.target;
                                const keyCode = event.keyCode || event.which;
                                
                                if (keyCode == 9) {
                                event.preventDefault();
                                const start = textareaElement.selectionStart;
                                const end = textareaElement.selectionEnd;
                                
                                textareaElement.value = textareaElement.value.substring(0,start) + "    " + textareaElement.value.substring(end);
                                
                                onChange({ newSource: textareaElement.value });
                                
                                textareaElement.selectionStart = start + 4;
                                textareaElement.selectionEnd = start + 4;
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        )
    }
}

class JSXRenderResult extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        const {id , innerRef} = this.props;
    
        return (<div className="axe-markdown__render-result" ref={innerRef} id={"render-result-" + id} />);
    }
}