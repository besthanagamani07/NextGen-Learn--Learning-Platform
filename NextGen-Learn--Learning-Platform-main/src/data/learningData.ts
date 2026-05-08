export interface Topic {
  id: string;
  title: string;
  definition: string;
  explanation: string;
  codeExample: string;
  keyPoints: string[];
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}

export const LEARNING_DATA: Course[] = [
  {
    id: 'html',
    title: 'HTML',
    icon: 'Layout',
    topics: [
      {
        id: 'intro-html',
        title: 'Introduction to HTML',
        definition: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages.',
        explanation: 'It describes the structure of a web page semantically and originally included cues for the appearance of the document.',
        codeExample: '<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<h1>My First Heading</h1>\n<p>My first paragraph.</p>\n</body>\n</html>',
        keyPoints: ["HTML is the backbone of all websites",
      "It uses tags like <h1>, <p>, <a>, etc.",
      "It defines structure, not design",
      "Browsers read HTML to display web pages"]
      },
      {
        id: 'html-attributes',
        title: 'HTML Attributes',
        definition: 'Attributes provide additional information about HTML elements.',
        explanation: 'Attributes are always included in the opening tag and usually come in name/value pairs like name="value".',
        codeExample: '<a href="https://example.com" target="_blank">Visit Example</a>',
        keyPoints: ['Common attributes include id, class, href, src', 'Used to provide extra information', 'Can be global or specific to certain tags']
      },
      {
        id: 'html-structure',
        title: 'HTML Document Structure',
        definition: 'An HTML document has a specific structure that includes the doctype, html, head, and body elements.',
        explanation: 'The doctype declaration defines the document type and version of HTML. The html element is the root of the document, the head contains meta-information, and the body contains the content.',
        codeExample: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
        keyPoints: ['<!DOCTYPE html> declares HTML5', '<html> is the root element', '<head> contains metadata', '<body> contains visible content']  
      },  
      {
        id: 'html-elements',
        title: 'HTML Elements',
        definition: 'An HTML element is a type of HTML document component, one of several types of HTML nodes.',
        explanation: 'Elements are defined by a start tag, some content, and an end tag. They can also be self-closing.',
        codeExample: '<div>\n  <h2>Section Title</h2>\n  <p>This is a section of content.</p>\n</div>',
        keyPoints: ['Elements are the building blocks of HTML', 'They can be nested inside each other', 'Some elements are self-closing like <img>']
      },
      {
        id: 'html-headings',
        title: 'HTML Headings',
        definition: 'HTML headings are defined with the <h1> to <h6> tags.',
        explanation: 'Headings are used to define the structure of the content and are important for SEO and accessibility.',
        codeExample: '<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<h3>Sub-subheading</h3>',
        keyPoints: ['<h1> is the most important heading', 'Use headings to create a logical structure', 'Headings improve SEO and accessibility']
      },
      {
        id: 'html-paragraphs',
        title: 'HTML Paragraphs',
        definition: 'HTML paragraphs are defined with the <p> tag.',
        explanation: 'Paragraphs are used to group sentences and sections of text together.',
        codeExample: '<p>This is a paragraph of text. It can contain multiple sentences.</p>',
        keyPoints: ['Use <p> to define paragraphs', 'Browsers automatically add space before and after <p>', 'Can contain inline elements like <a>']
      },
      {
        id: 'html-links',
        title: 'HTML Links',
        definition: 'HTML links are defined with the <a> tag.',
        explanation: 'Links are used to connect one page to another or to a specific part of a page.',
        codeExample: '<a href="https://example.com">Visit Example</a>',
        keyPoints: ['Use href attribute to specify the URL', 'Can open in a new tab with target="_blank"', 'Can link to sections within the same page with #id']
      },  
      {
        id: 'html-lists',
        title: 'HTML Lists',
        definition: 'HTML lists are used to group a set of related items in a specific order or without any order.',
        explanation: 'There are three types of lists: ordered lists (<ol>), unordered lists (<ul>), and description lists (<dl>).',
        codeExample: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>',
        keyPoints: ['Use <ul> for unordered lists', 'Use <ol> for ordered lists', 'Use <dl> for description lists']
      },
      {
        id: 'html-images',
        title: 'HTML Images',
        definition: 'HTML images are defined with the <img> tag.',
        explanation: 'The <img> tag is used to embed images in an HTML page. It is a self-closing tag and requires the src attribute to specify the image source.',
        codeExample: '<img src="image.jpg" alt="Description of image">',
        keyPoints: ['Use src attribute to specify image URL', 'Use alt attribute for accessibility', 'Can include width and height attributes']
      },
      {
        id: 'html-tables',
        title: 'HTML Tables',
        definition: 'HTML tables are defined with the <table> tag.',
        explanation: 'Tables are used to display data in a tabular format. They consist of rows (<tr>) and cells (<td> for data and <th> for headers).',
        codeExample: '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>30</td>\n  </tr>\n  <tr>\n    <td>Bob</td>\n    <td>25</td>\n  </tr>\n</table>',
        keyPoints: ['Use <table> to define a table', 'Use <tr> for table rows', 'Use <td> for data cells and <th> for header cells']
      },
      {
        id: 'html-divs',
        title: 'HTML Divisions',
        definition: 'The <div> tag defines a division or a section in an HTML document.',
        explanation: 'The <div> element is a block-level container that is used to group elements for styling or scripting purposes.',
        codeExample: '<div class="container">\n  <h2>Section Title</h2>\n  <p>This is a section of content.</p>\n</div>',
        keyPoints: ['Use <div> to group elements', 'Commonly used with CSS for styling', 'Does not inherently represent anything']
      },
      {
        id: 'html-spans',
        title: 'HTML Spans',
        definition: 'The <span> tag is an inline container used to mark up a part of a text, or a part of a document.',
        explanation: 'The <span> element is used to group inline-elements in a document. It provides no visual change by itself but can be used with CSS to style parts of the text.',
        codeExample: '<p>This is a <span class="highlight">highlighted</span> word.</p>',
        keyPoints: ['Use <span> for inline grouping', 'Commonly used with CSS for styling', 'Does not inherently represent anything'] 
      },
      {
        id: 'html-semantic-elements',
        title: 'HTML Semantic Elements',
        definition: 'Semantic elements clearly describe their meaning to both the browser and the developer.',
        explanation: 'Examples of semantic elements include <header>, <footer>, <article>, <section>, etc. They provide better structure and accessibility.',
        codeExample: '<header>\n  <h1>My Website</h1>\n</header>\n<main>\n  <article>\n    <h2>Article Title</h2>\n    <p>Article content...</p>\n  </article>\n</main>\n<footer>\n  <p>Copyright 2024</p>\n</footer>',
        keyPoints: ['Improves accessibility', 'Enhances SEO', 'Makes code more readable']
      },
      {
        id: 'html-attributes',
        title: 'HTML Attributes',
        definition: 'Attributes provide additional information about HTML elements.',
        explanation: 'Attributes are always included in the opening tag and usually come in name/value pairs like name="value".',
        codeExample: '<a href="https://example.com" target="_blank">Visit Example</a>',
        keyPoints: ['Common attributes include id, class, href, src', 'Used to provide extra information', 'Can be global or specific to certain tags']
      },
      
      {
        id: 'html-tags',
        title: 'HTML Tags & Elements',
        definition: 'HTML tags are the hidden keywords within a web page that define how your web browser must format and display the content.',
        explanation: 'An element is a collection of start tag, Its attributes, an end tag and everything in between.',
        codeExample: '<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n<a href="https://example.com">This is a link</a>',
        keyPoints: ['Tags usually come in pairs', 'Case-insensitive but lowercase preferred', 'Elements contain content']
      },
      {
        id: 'forms',
        title: 'Forms',
        definition: 'Forms are used to collect user input in web pages.',
        explanation: 'Forms allow users to enter data like login, signup, search, etc. that can be sent to a server.',
        codeExample: '<form>\n  <label for="fname">First name:</label><br>\n  <input type="text" id="fname" placeholder="Enter name"><br>\n  <button type="submit">Submit</button>\n</form>',
        keyPoints: ['Used for user input', 'Supports input types like text, email, password', 'Used in login and signup pages']
      },
      {
        id: 'semantic-html',
        title: 'Semantic HTML',
        definition: 'Semantic HTML refers to the use of HTML tags that convey the meaning of the content.',
        explanation: 'Using semantic tags like <header>, <footer>, <article>, etc. helps with accessibility and SEO.',
        codeExample: '<header>\n  <h1>My Website</h1>\n</header>\n<main>\n  <article>\n    <h2>Article Title</h2>\n    <p>Article content...</p>\n  </article>\n</main>\n<footer>\n  <p>Copyright 2024</p>\n</footer>',
        keyPoints: ['Improves accessibility', 'Enhances SEO', 'Makes code more readable']
      },
      {
        id: 'media',
        title: 'Media Elements',
        definition: 'Media elements in HTML allow you to embed audio and video content on your web pages.',
        explanation: 'The <audio> and <video> tags are used to embed media, and they support various attributes for controls, autoplay, etc.',
        codeExample: '<video width="320" height="240" controls>\n  <source src="movie.mp4" type="video/mp4">\n  Your browser does not support the video tag.\n</video>',
        keyPoints: ['Use <audio> for sound and <video> for video', 'Supports multiple formats with <source>', 'Can include controls for user interaction']  
      },
      {
        id: 'html-entities',
        title: 'HTML Entities',
        definition: 'HTML entities are used to display reserved characters in HTML.',
        explanation: 'Some characters like <, >, &, etc. have special meanings in HTML and must be represented by entities to be displayed correctly.',
        codeExample: '&lt;div&gt;This is a div element&lt;/div&gt;',
        keyPoints: ['Use &lt; for <', 'Use &gt; for >', 'Use &amp; for &']  
      },
      {
        id: 'html-comments',
        title: 'HTML Comments',
        definition: 'HTML comments are used to insert comments in the source code.',
        explanation: 'Comments are not displayed in the browser and are used to explain code or make notes for developers.',
        codeExample: '<!-- This is a comment -->\n<p>This is a paragraph.</p>',
        keyPoints: ['Use <!-- and --> to enclose comments', 'Not visible in the browser', 'Useful for documentation and debugging']
      },
      {
        id: 'html-doctype',
        title: 'DOCTYPE Declaration',
        definition: 'The DOCTYPE declaration is an instruction to the web browser about what version of HTML the page is written in.',
        explanation: 'The DOCTYPE declaration should be the very first thing in your HTML document, before the <html> tag.',
        codeExample: '<!DOCTYPE html>',
        keyPoints: ['Declares the document type', 'For HTML5, use <!DOCTYPE html>', 'Helps browsers render the page correctly']
      },
      {
        id: 'html-entities',
        title: 'HTML Entities',
        definition: 'HTML entities are used to display reserved characters in HTML.',
        explanation: 'Some characters like <, >, &, etc. have special meanings in HTML and must be represented by entities to be displayed correctly.',
        codeExample: '&lt;div&gt;This is a div element&lt;/div&gt;',
        keyPoints: ['Use &lt; for <', 'Use &gt; for >', 'Use &amp; for &']
      },
      {
        id: 'html-comments',
        title: 'HTML Comments',
        definition: 'HTML comments are used to insert comments in the source code.',
        explanation: 'Comments are not displayed in the browser and are used to explain code or make notes for developers.',
        codeExample: '<!-- This is a comment -->\n<p>This is a paragraph.</p>',
        keyPoints: ['Use <!-- and --> to enclose comments', 'Not visible in the browser', 'Useful for documentation and debugging']
      },
    ]
  },
  {
    id: 'css',
    title: 'CSS',
    icon: 'Palette',
    topics: [
      {
        id: 'intro-css',
        title: 'Introduction to CSS',
        definition: 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.',
        explanation: 'CSS describes how HTML elements are to be displayed on screen, paper, or in other media.',
        codeExample: 'h1 {\n  color: navy;\n  margin-left: 20px;\n}',
        keyPoints: ['Separates content from presentation', 'Controls layout of multiple web pages', 'Standard for web styling']
      },
      {
        id: 'selectors',
        title: 'Selectors',
        definition: 'CSS selectors are used to "find" (or select) the HTML elements you want to style.',
        explanation: 'Selectors can be based on element names, IDs, classes, attributes, and more.',
        codeExample: '/* Element Selector */\np {\n  color: red;\n}\n\n/* Class Selector */\n.intro {\n  font-size: 20px;\n}\n\n/* ID Selector */\n#main {\n  background: #eee;\n}',
        keyPoints: ['Use "." for classes', 'Use "#" for IDs', 'Can be combined for specificity']
      },
      {
        id: 'box-model',
        title: 'Box Model',
        definition: 'The CSS box model is essentially a box that wraps around every HTML element.',
        explanation: 'It consists of: margins, borders, padding, and the actual content.',
        codeExample: '.container {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid black;\n  margin: 10px;\n}',
        keyPoints: ['Content: The actual content', 'Padding: Space around content', 'Border: Around padding', 'Margin: Outer space']
      },
      {
        id: 'flexbox',
        title: 'Flexbox',
        definition: 'The Flexible Box Layout Module (Flexbox) makes it easier to design flexible responsive layout structure.',
        explanation: 'It provides a more efficient way to lay out, align and distribute space among items in a container.',
        codeExample: '.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
        keyPoints: ['One-dimensional layout', 'Flexible sizing', 'Alignment made easy']
      },
      {
        id: 'grid',
        title: 'CSS Grid',
        definition: 'CSS Grid Layout is a two-dimensional layout system for the web.',
        explanation: 'It allows developers to create complex responsive web design layouts more easily and consistently across browsers.',
        codeExample: '.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}',
        keyPoints: ['Two-dimensional layout', 'Defines rows and columns', 'Great for complex layouts']  
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        definition: 'Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes.',
        explanation: 'It uses CSS media queries to adapt the layout to the viewing environment.',
        codeExample: '@media (max-width: 600px) {\n  .container {\n    flex-direction: column;\n  }\n}',
        keyPoints: ['Adapts to different screen sizes', 'Uses media queries', 'Improves user experience on mobile devices']
      },
      {
        id: 'css-variables',
        title: 'CSS Variables',
        definition: 'CSS variables, also known as custom properties, are entities defined by CSS authors that contain specific values to be reused throughout a document.',
        explanation: 'They are defined using -- followed by the variable name and can be accessed using the var() function.',
        codeExample: ':root {\n  --main-color: #3498db;\n}\n\n.button {\n  background-color: var(--main-color);\n}',
        keyPoints: ['Defined with --', 'Accessed with var()', 'Can be scoped to elements']
      },
      {
        id: 'css-transitions',
        title: 'CSS Transitions',
        definition: 'CSS transitions allow you to change property values smoothly (over a given duration).',
        explanation: 'You can specify which properties to transition, the duration, and the timing function.',
        codeExample: '.box {\n  width: 100px;\n  height: 100px;\n  background-color: red;\n  transition: width 2s;\n}\n\n.box:hover {\n  width: 200px;\n}',
        keyPoints: ['Use transition property to define transitions', 'Can specify duration and timing function', 'Triggers on state changes like :hover']
      },
      {
        id: 'css-animations',
        title: 'CSS Animations',
        definition: 'CSS animations make it possible to animate transitions from one CSS style configuration to another.',
        explanation: 'You can create animations by specifying keyframes and applying them to elements.',
        codeExample: '@keyframes example {\n  from {background-color: red;}\n  to {background-color: yellow;}\n}\n\n.box {\n  width: 100px;\n  height: 100px;\n  background-color: red;\n  animation-name: example;\n  animation-duration: 4s;\n}',
        keyPoints: ['Define keyframes for animation', 'Apply animation to elements', 'Control duration and iteration']
      },
      {
        id: 'css-pseudo-classes',
        title: 'CSS Pseudo-classes',
        definition: 'CSS pseudo-classes are used to define a special state of an element.',
        explanation: 'They can be used to style an element when it is hovered over, focused, or in other states.',
        codeExample: 'a:hover {\n  color: red;\n}\n\ninput:focus {\n  border-color: blue;\n}',
        keyPoints: ['Used for interactive states', 'Common pseudo-classes include :hover, :focus, :active', 'Enhances user experience'] 
      },
      {
        id: 'css-pseudo-elements',
        title: 'CSS Pseudo-elements',
        definition: 'CSS pseudo-elements are used to style specified parts of an element.',
        explanation: 'They allow you to create and style elements that do not exist in the document tree.',
        codeExample: 'p::first-letter {\n  font-size: 200%;\n  color: red;\n}\n\np::before {\n  content: "Note: ";\n  font-weight: bold;\n}',
        keyPoints: ['Used to style parts of an element', 'Common pseudo-elements include ::before, ::after, ::first-letter', 'Can add content with the content property']
      },
      {
        id: 'css-specificity',
        title: 'CSS Specificity',
        definition: 'CSS specificity is a set of rules that browsers use to determine which CSS rule applies when multiple rules could apply to the same element.',
        explanation: 'Specificity is calculated based on the types of selectors used in the rule. Inline styles have the highest specificity, followed by IDs, classes, and element selectors.',
        codeExample: '/* Specificity: 0,1,0 (class) */\n.intro {\n  color: red;\n}\n\n/* Specificity: 0,0,1 (element) */\np {\n  color: blue;\n}\n\n/* Specificity: 1,0,0 (ID) */\n#main {\n  color: green;\n}',
        keyPoints: ['Higher specificity overrides lower', 'Inline styles have highest specificity', 'IDs > Classes > Elements']
      },
      {
        id: 'css-inheritance',
        title: 'CSS Inheritance',
        definition: 'CSS inheritance is a mechanism by which some CSS property values applied to a parent element are inherited by its children.',
        explanation: 'Not all properties are inherited. For example, text-related properties like color and font-family are inherited, while box model properties like margin and padding are not.',
        codeExample: 'body {\n  color: black;\n}\n\np {\n  font-size: 16px;\n}',
        keyPoints: ['Some properties are inherited by default', 'Use "inherit" value to force inheritance', 'Use "initial" value to reset to default']
      },
      {
        id: 'css-resets',
        title: 'CSS Resets',
        definition: 'CSS resets are used to reduce browser inconsistencies in things like default line heights, margins and font sizes of headings, etc.',
        explanation: 'A CSS reset sets all elements to have no margin, padding, or borders, and a consistent font size and line height.',
        codeExample: '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}',
        keyPoints: ['Reduces browser inconsistencies', 'Sets all elements to a baseline', 'Commonly used at the start of CSS files']
      },
      {
        id: 'css-frameworks', 
        title: 'CSS Frameworks',
        definition: 'CSS frameworks are pre-prepared libraries that are meant to be used as a base for starting responsive web design projects.',
        explanation: 'They provide a grid system, pre-styled components, and utilities to speed up development.',
        codeExample: '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">\n\n<div class="container">\n  <div class="row">\n    <div class="col-md-6">Column 1</div>\n    <div class="col-md-6">Column 2</div>\n  </div>\n</div>',
        keyPoints: ['Provides pre-styled components', 'Includes a grid system', 'Speeds up development']
      },
      {
        id: 'css-preprocessors',
        title: 'CSS Preprocessors',
        definition: 'CSS preprocessors are scripting languages that extend CSS and then compile it into regular CSS.',
        explanation: 'They allow you to use features that are not yet available in CSS, such as variables, nesting, and mixins.',
        codeExample: '$primary-color: #3498db;\n\n.button {\n  background-color: $primary-color;\n  &:hover {\n    background-color: darken($primary-color, 10%);\n  }\n}',
        keyPoints: ['Extends CSS with additional features', 'Compiles to regular CSS', 'Popular preprocessors include Sass and Less']
      },
      {
        id: 'css-postprocessors',
        title: 'CSS Postprocessors',
        definition: 'CSS postprocessors are tools that take your CSS and process it to add vendor prefixes, optimize it, or add future CSS features.',
        explanation: 'They can automatically add vendor prefixes for better browser support or allow you to use future CSS syntax today.',
        codeExample: '/* Input CSS */\n.button {\n  display: flex;\n}\n\n/* Output CSS with vendor prefixes */\n.button {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}',
        keyPoints: ['Processes CSS after writing', 'Adds vendor prefixes', 'Allows use of future CSS features']
      },
      {
        id: 'css-in-js',
        title: 'CSS-in-JS',
        definition: 'CSS-in-JS is a styling technique where CSS is composed using JavaScript instead of defined in external files.',
        explanation: 'This approach allows for dynamic styling and scoped styles within components, often used in React applications.',
        codeExample: 'import styled from "styled-components";\n\nconst Button = styled.button`\n  background-color: blue;\n  color: white;\n  padding: 10px;\n`;\n\nfunction App() {\n  return <Button>Click Me</Button>;\n}',
        keyPoints: ['Styles are defined in JavaScript', 'Allows for dynamic and scoped styles', 'Popular libraries include styled-components and Emotion']
      },
      {
        id: 'css-variables',
        title: 'CSS Variables',
        definition: 'CSS variables, also known as custom properties, are entities defined by CSS authors that contain specific values to be reused throughout a document.',
        explanation: 'They are defined using -- followed by the variable name and can be accessed using the var() function.',
        codeExample: ':root {\n  --main-color: #3498db;\n}\n\n.button {\n  background-color: var(--main-color);\n}',
        keyPoints: ['Defined with --', 'Accessed with var()', 'Can be scoped to elements']

      },
      {
        id: 'css-specificity',
        title: 'CSS Specificity',
        definition: 'CSS specificity is a set of rules that browsers use to determine which CSS rule applies when multiple rules could apply to the same element.',
        explanation: 'Specificity is calculated based on the types of selectors used in the rule. Inline styles have the highest specificity, followed by IDs, classes, and element selectors.',
        codeExample: '/* Specificity: 0,1,0 (class) */\n.intro {\n  color: red;\n}\n\n/* Specificity: 0,0,1 (element) */\np {\n  color: blue;\n}\n\n/* Specificity: 1,0,0 (ID) */\n#main {\n  color: green;\n}',
        keyPoints: ['Higher specificity overrides lower', 'Inline styles have highest specificity', 'IDs > Classes > Elements']
      }
    ]
  },
  {
    id: 'js',
    title: 'JavaScript',
    icon: 'Code',
    topics: [
      {
        id: 'variables',
        title: 'Variables & Data Types',
        definition: 'Variables are containers for storing data values.',
        explanation: 'JavaScript uses let and const for modern variable declaration. Primitive types include String, Number, Boolean, Null, and Undefined.',
        codeExample: 'const name = "NextGen";\nlet score = 100;\nconst isActive = true;',
        keyPoints: ['const for values that do not change', 'let for values that change', 'JS is dynamically typed']
      },
      {
        id: 'functions',
        title: 'Functions',
        definition: 'A JavaScript function is a block of code designed to perform a particular task.',
        explanation: 'Functions are executed when something invokes (calls) it.',
        codeExample: 'function greet(name) {\n  return "Hello " + name;\n}\n\n// Arrow Function\nconst add = (a, b) => a + b;',
        keyPoints: ['Reusable code blocks', 'Can take parameters', 'Can return values']
      },
      {
        id: 'dom',
        title: 'DOM Manipulation',
        definition: 'The HTML DOM is a standard for how to get, change, add, or delete HTML elements.',
        explanation: 'JavaScript can access and change all the elements of an HTML document through the DOM.',
        codeExample: 'const btn = document.querySelector("#myBtn");\nbtn.addEventListener("click", () => {\n  document.body.style.backgroundColor = "blue";\n});',
        keyPoints: ['querySelector is the universal selector', 'Modify text with textContent', 'Update styles with .style']
      }
    ]
  },
  {
    id: 'react',
    title: 'React JS',
    icon: 'Zap',
    topics: [
      {
        id: 'components',
        title: 'Components',
        definition: 'Components are independent and reusable bits of code.',
        explanation: 'They serve the same purpose as JavaScript functions, but work in isolation and return HTML via a render function.',
        codeExample: 'function Button({ label }) {\n  return <button>{label}</button>;\n}',
        keyPoints: ['Use PascalCase for component names', 'Return JSX', 'Can be nested']
      },
      {
        id: 'props',
        title: 'Props',
        definition: 'Props are used to pass data from a parent component to child components.',
        explanation: 'Props are "read-only" and should not be modified by the child component.',
        codeExample: 'function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}',
        keyPoints: ['Short for Properties', 'Passed like HTML attributes', 'One-way data flow']
      },
      {
        id: 'state',
        title: 'State (useState)',
        definition: 'State is a built-in React object that is used to contain data or information about the component.',
        explanation: 'The useState hook allows you to add state to functional components.',
        codeExample: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
        keyPoints: ['Preserves value between renders', 'Triggers re-render when changed', 'Accessed via destructuring']
      }
    ]
  }
];
