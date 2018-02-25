---
imports:
   'TestComponent': './TestComponent'
---

# Axe Markdown Loader Examples

## Basic Example

```jsx show-source
<div className="the-best-class-ever">
    Hello
</div>
```

## Using imports
At the top of the page use YAML to import:
```md show-source no-render
---
imports:
   'TestComponent': './TestComponent'
   '{ moreImports , anotherImport as theImport }': 'cool-module'
---
```

```jsx show-source
<TestComponent
    someProp="lorem ipsum"
/>
```

## Using props from parent
```jsx show-source
<div>
    <button onClick={props.clickExample}>
        Click me
    </button> to see some onClick bindings!
    
    <br /><br />
    
    The following text is {props.parentProp}
</div>
```

## No render - just the source:
```jsx no-render show-source
<div>
    Just some sources...
</div>
```

## Some SCSS
```scss show-source
.scss-example {
    background:red;
}
```
```jsx show-source
<div className="scss-example">
    Paint it red!
</div>
```

## Showing markdown sources
```md show-source
# Title

## The subtitle

~~~javascript
var test = 123;
~~~
```  

## Hiding line numbers
```jsx show-source no-line-numbers
<div>
    Hello
</div>
```     