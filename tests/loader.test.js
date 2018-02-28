const parse = require('../src/parse').parse;
const buildComponent = require('../src/buildComponent').buildComponent;

const removeIndentationsBy4Tabs = string => string.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\n\t\t\t\t/g, '\n');

/* eslint-disable no-undef */
describe('markdown loader', () => {
	describe('markdown parser', () => {

		it('correctly parses simple markdown', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
		
				# Heading 1
				
				## Heading 2
				
				### Heading 3
				
				#### Heading 4
				
				##### Heading 5
				
				###### Heading 6
				
				Emphasis, aka italics, with *asterisks* or _underscores_.
				
				Strong emphasis, aka bold, with **asterisks** or __underscores__.
				
				Combined emphasis with **asterisks and _underscores_**.
				
				Strikethrough uses two tildes. ~~Scratch this.~~
				
				1. First ordered list item
				2. Another item
				⋅⋅* Unordered sub-list. 
				1. Actual numbers don't matter, just that it's a number
				⋅⋅1. Ordered sub-list
				4. And another item.
	
				⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).
	
				⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
				⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
				⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)
	
				* Unordered list can use asterisks
				- Or minuses
				+ Or pluses
				
				[I'm an inline-style link](https://www.google.com)
				
				[I'm an inline-style link with title](https://www.google.com "Google's Homepage")
				
				[I'm a reference-style link][Arbitrary case-insensitive reference text]
				
				[I'm a relative reference to a repository file](../blob/master/LICENSE)
				
				[You can use numbers for reference-style link definitions][1]
				
				Or leave it empty and use the [link text itself].
				
				URLs and URLs in angle brackets will automatically get turned into links. 
				http://www.example.com or <http://www.example.com> and sometimes 
				example.com (but not on Github, for example).
				
				Some text to show that the reference links can follow later.
				
				[arbitrary case-insensitive reference text]: https://www.mozilla.org
				[1]: http://slashdot.org
				[link text itself]: http://www.reddit.com
				
				Here's our logo (hover to see the title text):
	
				Inline-style: 
				![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
				
				Reference-style: 
				![alt text][logo]
				
				[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
				
				Inline \`code\` has \`back-ticks around\` it.
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});
		});

		it('correctly parses js imports', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
			
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
				---
			
				# Heading 1
				
				## Heading 2
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses additional attributes', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
		
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
					
				moreAttributes:
					'cool': 'test'
					'wow': 'man'
					
				watsup: 'man!'
					
				attribute-with-dashes: 'value'
					
				nestedAttributes:
					'cool':
						'test': 'i am nested'
						
					'wow':
						'deep nested':
							'i am': 'seriously nested'
				---
			
				# Heading 1
				
				## Heading 2
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses empty body with just imports & attributes', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
			
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
					
				moreAttributes:
					'cool': 'test'
					'wow': 'man'
					
				watsup: 'man!'
					
				attribute-with-dashes: 'value'
					
				nestedAttributes:
					'cool':
						'test': 'i am nested'
						
					'wow':
						'deep nested':
							'i am': 'seriously nested'
				---
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses JSX', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
			
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
				---
				
				# Hello
				
				\`\`\`jsx
				<DefaultComponent
					name="Sammy"
					lastName="Saglam"
				/>
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses JSX and shows source', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
			
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
				---
				
				# Hello
				
				\`\`\`jsx show-source
				<DefaultComponent
					name="Sammy"
					lastName="Saglam"
				/>
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses CSS and shows source', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
			
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
				---
				
				# Hello
				
				\`\`\`css show-source
				
				body {
					background: red;
				}
				
				div .test > #incredible::before {
					content: 'cool';
					color: blue;
				}
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses SCSS (SASS) and shows source', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
		
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
				---
				
				# Hello
				
				\`\`\`scss show-source
				
				body {
					background: red;
					
					$variable: #FFF;
					
					div .test > #incredible::before {
						content: 'cool';
						color: $variable;
					}
				}
				
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly parses markdown and inner fence blocks + shows source', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
		
				# Writing markdown fence blocks

				\`\`\`md show-source
				# Title
				
				## The subtitle
				
				~~~css
				body {
				    background:red;
				}
				~~~
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

		it('correctly escapes backslashes in source code render', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
		
				### Simple ORM
				\`\`\`php
				class Sale extends \\Axe\\ORM {
				   
				  public static function allowed_fields() {
				    return array(
				      "deliveryStatus",
				      "date",
				      "customerId",
				      "customerAddresses" => Address::get_allowed_fields(),
				      "productsSold"      => Product::get_allowed_fields()
				    );
				  }
				}
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => {

				try {
					expect(componentData).toMatchSnapshot();
					done();

				} catch (error) {
					done(error);
				}
			});

		});

	});

	describe('component builder', () => {

		it('correctly build component based on JSX source', done => {

			const markdownToTest = removeIndentationsBy4Tabs(`
		
				---
				imports:
					'{Compo , Apple , Pear}': '../src/PathToComponent'
					'DefaultComponent': 'module-name'
				---
				
				# Hello
				
				\`\`\`jsx show-source
				<DefaultComponent
					name="Sammy"
					lastName="Saglam"
				/>
				\`\`\`
				
			`);

			parse(markdownToTest).then(componentData => buildComponent(componentData)).then(component => {

				try {
					expect(component).toMatchSnapshot();

					done();

				} catch (error) {
					done(error);
				}
			});
		});

	});
});