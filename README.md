# axe-markdown-loader
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sammysaglam/axe-markdown-loader/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/axe-markdown-loader.svg?style=flat)](https://www.npmjs.com/package/axe-markdown-loader)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Developer-friendly way to automate React component documentation (including automation of props tables & examples).

```javascript
import SomeMarkdownFile from "./SomeMarkdownFile.md";
```

```jsx
<SomeMarkdownFile
    exampleProp="hello"
    anotherProps={() => {
        console.log('world')}
    }
/>
```

> Requirements:
> - Webpack
> - React 16.2.0 or greater

## Usage Demo Video
The below demo video will demonstrate how to document any component; in the
below example I used [ReactTable](https://react-table.js.org/#/story/readme)
by **react-tools**

### Screenshot:
![Usage Example](/SCREENSHOTS/main-demo.gif?raw=true "Usage Example")


## Importing Markdown file example:
"App.js" :
```javascript
import SomeMarkdownFile from "./SomeMarkdownFile.md";

const YourReactComponent = () => (
	<div>
	    <SomeMarkdownFile
	        propVar={3344}
	        propString="Ipsum lorem ;)"
	        propFunc={() => {
	        	console.log('hello')}
	        }
	    />
	</div>
);

export default YourReactComponent;
```



## Features

- Import markdown using ES6 import statements.
- Render React components with JSX fence blocks in your markdown.
    - Optional: show React component's JSX source below render.
- Edit sources of renders on-the-fly in your browser.
- Apply CSS to page directly from within your Markdown files using fence blocks.
- Import other React components, or even any other modules into your markdown files.
- Display line numbers in source code.



## Installation

### Step 1: add dependency
```bash
npm install axe-markdown-loader --save-dev
```

or if you  use yarn:

```bash
yarn add axe-markdown-loader --dev
```


### Step 2: add to webpack config
Add to your webpack module/rules configuration:
```javascript
{
	test: /\.md/ ,
	loader: ['babel-loader', 'axe-markdown-loader'] ,
	exclude: /node_modules/
}
```

#### example webpack.config.js:
```javascript
module.exports = {
    entry:'./src/entry',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.md/, exclude: /node_modules/, loader: ['babel-loader', 'axe-markdown-loader'] },
        ]
    }
};
```

### Install styles
```scss
@import "~axe-markdown-loader/src/themes/dark.theme";
```

or use light theme:
```scss
@import "~axe-markdown-loader/src/themes/light.theme";
```

# Markdown Guide

## Basic Example
```md
# A title

```jsx
<div className="the-best-class-ever">
    Hello
</div>
```                                                       .
```
### Screenshot:
![Basic Example](/SCREENSHOTS/basic-example.png?raw=true "Basic Example")




## Showing the source code of a React component
Add "show-source" next to fence block language name:
```md
# A title

```jsx show-source
<div>Hello</div>
```                                                       .
```
### Screenshot:
![Show Source](/SCREENSHOTS/show-source.png?raw=true "Show Source")




## Variable Injection
Use #{....} template blocks to inject variables
```md
```jsx show-source

<div>#{ 500 * 500 }</div>

<div className="#{props.someClassName}">hello</div>

#{true ? `<div className="visible">hello #{5 * 5}</div>` : ""}

```                                                       .
```




## Importing modules / other React components
```md
---
imports:
   'reduce': 'reduce-object'
   'TestComponent': './TestComponent'
---

```jsx show-source
<TestComponent
    someProp="lorem ipsum"
/>
```                                                       .
```
### Screenshot:
![Importing](/SCREENSHOTS/imports.png?raw=true "Importing")




## Showing only the source without the render:
Add "no-render" next to fence block:
```md
---
imports:
   'reduce': 'reduce-object'
   'TestComponent': './TestComponent'
---

```jsx show-source no-render
<TestComponent
    someProp="lorem ipsum"
/>
```                                                       .
```
### Screenshot:
![No Render](/SCREENSHOTS/no-render.png?raw=true "No Render")




## Applying CSS to page:
The following will turn the page's background red:
```md
# Paint it red!
```scss show-source
body {
    background: red;
}
```                                                       .
```
### Screenshot:
![Paint it Red](/SCREENSHOTS/paint-it-red.png?raw=true "Paint it Red")




## Don't apply, just show the source!
Add "no-render" if you don't want to apply your scss styles:
```md
```scss show-source no-render
body {
    background: red;
}
```                                                       .
```
### Screenshot:
![Don't Apply CSS](/SCREENSHOTS/dont-apply-scss.png?raw=true "Don't Apply CSS")




## fence blocks inside fence block
When writing markdown examples, use ~~~ to open/close your fence blocks:
```md
# Writing markdown fence blocks

```md show-source
# Title

## The subtitle

~~~css
body {
    background:red;
}
~~~
```                                                       .
```
### Screenshot:
![Fence Blocks in Markdown](/SCREENSHOTS/markdown-fence-blocks.png?raw=true "Fence Blocks in Markdown")




## Hide line numbers
Add "no-line-numbers" if you don't want display the line numbers in the source code:
```md
# A title

```jsx show-source no-line-numbers
<div className="the-best-class-ever">
    Hello
</div>
```                                                       .
```




## Integration with axe-prop-types
Automatically generate PropsTable by using [axe-prop-types](https://github.com/sammysaglam/axe-prop-types).

> This requires installing [axe-prop-types](https://github.com/sammysaglam/axe-prop-types#step-1-add-dependency) & configuring webpack by following instructions here: [axe-prop-types](https://github.com/sammysaglam/axe-prop-types#step-2-add-to-webpack-config)
 
```md
---                                                       .
imports:
    'ReactLoginPanel': 'react-login-panel'
---                                                       .

## PropTypes
[PROPS_TABLE(ReactLoginPanel)]
```
### Screenshot:
![Rendering Component Props Table](/SCREENSHOTS/axe-prop-types.png?raw=true "Rendering Component Props Table")



## License
MIT