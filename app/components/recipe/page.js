// // components/Recipe.js
// import React from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// // You can pick a different theme from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { vs } from 'react-syntax-highlighter/dist/styles/';
// //import {javascript} from  "react-syntax-highlighter/dist/languages/javascipt" ;
// const Recipe = ({ codeString, language }) => {
//   return (
//     <SyntaxHighlighter
//       style={vs} // Apply your chosen style
//       language= {'javascript'} // Specify the language (e.g., 'jsx', 'javascript')
//       showLineNumbers={true} // Optional: show line numbers
//       wrapLines={true} // Optional: wrap long lines
//     >
//       {codeString}
//     </SyntaxHighlighter>
//   );
// };

// export default Recipe;

// components/Recipe.js
'use client'; // This directive is necessary for client-side components in Next.js App Router

import {React , useState , useEffect} from 'react'; // Explicitly import React for JSX
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/styles'; // Or any other theme
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown

const Recipe = ({ content }) => {

//const [contentState , setContentState] =useState("") ;
const [markdownToRender , setMarkdownToRender] = useState("") ;

//useEffect(()=>{setContentState(content)})
useEffect(()=>{if(!content)
                  {console.log("recipe is null.❌")
                   return ;
                  }},[])

console.log("Content before parsing : " , content) ;
useEffect(() => {
    try {
      // 1. Parse the outer JSON array
      const parsedArray = JSON.parse(content);
      console.log("content before parsing under try block : " , content) ;
      console.log("content after json parsed : ", parsedArray) ;
      // 2. The actual markdown content is the first element of this array
      //    (and it's still escaped at this point)
      const escapedMarkdown = parsedArray[0];
      console.log("escapedMarkdown : " , escapedMarkdown) ;

      let processedMarkdown = escapedMarkdown ;
      if (processedMarkdown.startsWith('```markdown\n')) {
        console.log("start with ```markdown\\n ❌❌❌❌❌❌❌") ;
        processedMarkdown = processedMarkdown.substring('```markdown\\n'.length);
      }
      if (processedMarkdown.endsWith('\n```')) {
        console.log("ends with \\n```❌❌❌❌❌❌")
        processedMarkdown = processedMarkdown.substring(0, processedMarkdown.length - '\\n```'.length);
      }    
      console.log("processedMarkdown : ",processedMarkdown) ;  
      // 3. Unescape the newline characters, which are represented as '\\n' in the string
      //    JSON.parse() correctly handles the double quotes, but not the double backslashes
      //    for newlines within the string content.
      const unescapedMarkdown = processedMarkdown.replace(/\\n/g, '\n'); // Replace \\n with actual newline
      // Also replace \\ for general escaped backslashes if any other exist, though less common here.
      // const unescapedMarkdown = unescapedMarkdown.replace(/\\(["])/g, '$1'); // This handles \" if needed, but JSON.parse usually does this.
      
      setMarkdownToRender(unescapedMarkdown);
      console.log("MarkdownToRender : " , unescapedMarkdown) ;

    } catch (error) {
      console.error("Failed to parse or unescape markdown string:", error);
      setMarkdownToRender("Error loading recipes. Please check the data format.");
    }
}, [content]); // Re-run if the response string changes


  return (
    <div className="markdown-body"> {/* Optional: Add a class for global styling */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Standard way to add plugins
        components={{
          // Custom rendering for code blocks to enable syntax highlighting
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vs} // Apply your chosen style
                language={match[1]} // Extract language from className (e.g., 'language-javascript')
                PreTag="div" // Wrap code in a div
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // You can add more custom components here if needed,
          // e.g., for images, links, or specific headings.
        }}
      >
        {markdownToRender}
      </ReactMarkdown>
    </div>
  );
};

export default Recipe;


