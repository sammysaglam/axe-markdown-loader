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

## Variable Injection
```jsx show-source
<div className="the-best-class-ever-#{5*5}">
    #{234 * 500} --> inserted using: {'  \#{234 * 500}  '}
    {'   #{JSON.stringify({object:"prop"})}   '} --> inserted using: {'  \#{JSON.stringify({object:"prop"})}  '}

    #{true ? `hello #{5 * 5}` : ""}
</div>

#{ true ? `<div>i am rendered because I have a true condition injected before me: {'  \#{true ? "...text..." : ""}  '}</div>` : '' }
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

    #{5 * 500}
    
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

## Some javascript
```js show-source
console.log("props = " , props);
```

## Some html
```html show-source
<div class="it-works">it works</div>
```