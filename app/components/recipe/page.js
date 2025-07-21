// 'use client';
    
// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vs } from 'react-syntax-highlighter/dist/styles';
// import remarkGfm from 'remark-gfm';

// // Ensure github-markdown-css is installed and imported globally (e.g., in app/globals.css)

// const Recipe = ({ content }) => {
//   // Initialize state to an empty string to avoid "Loading content..." in error
//   const [markdownToRender, setMarkdownToRender] = useState(``);
  
//   // Log the raw `content` prop when the component receives it
//   console.log("1. Raw content prop received by Recipe:", content, typeof content);

//   useEffect(() => {
//     console.log("3. useEffect triggered. Content:", content, typeof content);

//     if (!content) {
//       console.log("4. Content is null/empty. Setting default message.");
//       setMarkdownToRender("No content provided.");
//       console.log("4a. Type after setting default:", typeof "No content provided.");
//       return;
//     }

//     // Explicitly convert to string to prevent non-string types
//     var processedMarkdown = String(content || ''); 
//     // processedMarkdown = "## Garlicky Tomato Salad 🥗  \nA refreshing and simple salad that highlights ripe tomatoes with a zesty garlic dressing. Perfect as a light appetizer or side dish.  \n\n### Ingredients  \n- 4 large tomatoes 🍅, cut into wedges  \n- 1 clove garlic, minced  \n- 2 tbsp extra virgin olive oil  \n- 1 tsp red wine vinegar (optional)  \n- Salt and black pepper to taste  \n- Fresh basil leaves 🌿 (optional, for garnish)  \n\n### Instructions  \n1. In a bowl, combine tomato wedges and minced garlic.  \n2. Drizzle with olive oil and vinegar (if using). Gently toss.  \n3. Season generously with salt and pepper.  \n4. Let sit for 10 minutes to allow flavors to meld.  \n5. Garnish with torn basil leaves before serving (optional).  \n\n---\n\n## Simple Tomato Soup 🍲  \nA comforting, velvety soup using minimal ingredients. Ready in under 30 minutes!  \n\n### Ingredients  \n- 6 large tomatoes 🍅, chopped  \n- 1 tbsp olive oil  \n- 2 cups water or vegetable broth  \n- 1 tsp sugar  \n- Salt and black pepper to taste  \n- Pinch of red pepper flakes 🌶️ (optional)  \n\n### Instructions  \n1. Heat olive oil in a pot over medium heat. Add chopped tomatoes and sauté for 5 minutes.  \n2. Pour in water or broth. Bring to a simmer.  \n3. Cook uncovered for 15 minutes, stirring occasionally.  \n4. Blend with an immersion blender until smooth (or transfer to a blender).  \n5. Stir in sugar, salt, pepper, and red pepper flakes (if using). Simmer for 5 more minutes.  \n6. Serve hot.  \n\n---\n\n## Roasted Tomatoes with Herbs 🍅✨  \nCaramelized tomatoes with aromatic depth—ideal as a side or topping for grains.  \n\n### Ingredients  \n- 8 medium tomatoes 🍅, halved  \n- 2 tbsp olive oil  \n- 1 tsp dried oregano or thyme  \n- Salt and black pepper to taste  \n\n### Instructions  \n1. Preheat oven to 400°F (200°C).  \n2. Arrange tomato halves cut-side up on a baking sheet.  \n3. Drizzle with olive oil and sprinkle with herbs, salt, and pepper.  \n4. Roast for 25–30 minutes until skins wrinkle and edges caramelize.  \n5. Serve warm as a side dish or over cooked rice/polenta.  \n\n---\n\n## Quick Tomato Bruschetta 🍞🍅  \nA classic appetizer featuring juicy tomatoes on crispy bread—no oven required!  \n\n### Ingredients  \n- 4 ripe tomatoes 🍅, finely diced  \n- 1 tbsp olive oil  \n- 1 clove garlic, minced  \n- Salt and black pepper to taste  \n- 4 slices crusty bread (e.g., baguette), toasted  \n- Fresh basil 🌿 (optional)  \n\n### Instructions  \n1. Mix diced tomatoes, olive oil, minced garlic, salt, and pepper in a bowl.  \n2. Let the mixture sit for 5 minutes to release juices.  \n3. Spoon tomato mixture generously onto toasted bread slices.  \n4. Top with torn basil leaves (optional). Serve immediately.  \n\n---\n\n## Tomato & White Bean Salad 🥫🥗  \nProtein-packed and tangy—a no-cook meal ready in 10 minutes!  \n\n### Ingredients  \n- 3 tomatoes 🍅, diced  \n- 1 can (15 oz) white beans, rinsed  \n- 1 tbsp olive oil  \n- 1 tsp lemon juice or vinegar  \n- Salt and black pepper to taste  \n- Fresh parsley 🌿 (optional)  \n\n### Instructions  \n1. In a large bowl, combine tomatoes and rinsed white beans.  \n2. Drizzle with olive oil and lemon juice/vinegar.  \n3. Season with salt and pepper; toss gently.  \n4. Garnish with parsley (optional). Chill for 10 minutes before serving." ;
//     console.log("type of content and processedMarkdown : " ,typeof content , typeof processedMarkdown ) ;
    
//     // Your existing string cleaning logic
//     if (processedMarkdown.startsWith('```markdown\n')) {
//       console.log("5. Removing ```markdown\\n prefix.");
//       processedMarkdown = processedMarkdown.substring('```markdown\\n'.length);
//     }
//     if (processedMarkdown.endsWith('\n```')) {
//       console.log("6. Removing \\n``` suffix.");
//       processedMarkdown = processedMarkdown.substring(0, processedMarkdown.length - '\n```'.length);
//     }
//     processedMarkdown = processedMarkdown.replace(/(\s*)\n/g, '\n').trim();

//     while(processedMarkdown.startsWith === `"`)
//       processedMarkdown = processedMarkdown.slice(1) ;

//     while(processedMarkdown.endsWith === `"`)
//        processedMarkdown = processedMarkdown.slice(0 , processedMarkdown.length-1) ;


    
//     setMarkdownToRender(processedMarkdown);
    

//     console.log("7. Processed Markdown string before setting state:", processedMarkdown, typeof processedMarkdown);
//     console.log("8. State 'markdownToRender' updated.");

//   }, [content]);

//   // This log is crucial as it shows what ReactMarkdown actually receives
//   console.log("9. markdownToRender value directly before ReactMarkdown render:", markdownToRender, typeof markdownToRender);
  
//   // Add an assertion here just before returning to catch non-string values
//   if (typeof markdownToRender !== 'string') {
//     console.error("CRITICAL ERROR: markdownToRender is NOT a string!", markdownToRender, typeof markdownToRender);
//     return <div>Error: Invalid Markdown content type.</div>;
//   }


//   return (
//     <div className="markdown-body">
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         components={{
//           code: ({ node, inline, className, children, ...props }) => {
//             const match = /language-(\w+)/.exec(className || '');
//             return !inline && match ? (
//               <SyntaxHighlighter
//                 style={vs}
//                 language={match[1]}
//                 PreTag="div"
//                 {...props}
//               >
//                 {String(children).replace(/\n$/, '')}
//               </SyntaxHighlighter>
//             ) : (
//               <code className={className} {...props}>
//                 {children}
//               </code>
//             );
//           },
//         }}
//       >
//         {String(`"## Classic Oregano Bruschetta 🍅🍞 \nCrispy bread slices topped with juicy tomatoes and aromatic oregano – a 5-minute Italian classic that bursts with freshness. \n\n### Ingredients \n- 4 thick slices of bread (baguette or rustic loaf) \n- 2 ripe tomatoes 🍅, finely diced \n- 1 tbsp dried oregano 🌿 \n- 2 tbsp olive oil \n- 1 garlic clove, halved \n- Salt and black pepper to taste \n\n### Instructions \n1. Toast bread slices in a toaster, oven, or grill until golden and crisp. \n2. Rub the toasted bread with cut garlic clove. \n3. In a bowl, mix diced tomatoes, oregano, 1 tbsp olive oil, salt, and pepper. \n4. Spoon tomato mixture generously over bread slices. \n5. Drizzle with remaining olive oil and serve immediately. \n\n***\n\n## Tomato-Oregano Bread Soup (Pappa al Pomodoro) 🥣🍅 \nA rustic Tuscan soup where stale bread transforms into velvety comfort with tomatoes and oregano. \n\n### Ingredients \n- 4 cups stale bread 🍞, torn into chunks \n- 4 ripe tomatoes 🍅, chopped (or 1 can crushed tomatoes) \n- 2 tsp dried oregano 🌿 \n- 3 tbsp olive oil \n- 2 garlic cloves, minced \n- 3 cups water or vegetable broth \n- Salt and pepper to taste \n\n### Instructions \n1. Heat olive oil in a pot over medium heat. Sauté garlic until fragrant (1 minute). \n2. Add tomatoes, oregano, salt, and pepper. Cook until tomatoes break down (5-7 minutes). \n3. Stir in bread chunks, coating them with the tomato mixture. \n4. Pour in water/broth. Simmer for 15-20 minutes, stirring occasionally, until bread dissolves into a thick porridge. \n5. Adjust seasoning. Serve hot, drizzled with olive oil. \n\n***\n\n## No-Cook Tomato Bread Salad (Panzanella) 🥗🍞 \nA refreshing summer salad that revives stale bread with juicy tomatoes and zesty oregano dressing. \n\n### Ingredients \n- 3 cups stale bread 🍞, torn into bite-sized pieces \n- 2 large tomatoes 🍅, chopped \n- 1 tbsp dried oregano 🌿 \n- 3 tbsp olive oil \n- 1 tbsp red wine vinegar (optional) \n- Salt and pepper to taste \n\n### Instructions \n1. Place bread pieces in a large bowl. \n2. Add chopped tomatoes and oregano. Toss gently. \n3. In a small bowl, whisk olive oil, vinegar (if using), salt, and pepper. \n4. Pour dressing over bread mixture. Let sit for 10-15 minutes to allow bread to soften and absorb flavors. \n5. Adjust seasoning and serve at room temperature. \n\n***\n\n## Oregano-Tomato Bread Crumbs 🌿🍅 \nTransform bread into a versatile crispy topping infused with tomato and oregano. \n\n### Ingredients \n- 2 slices stale bread 🍞 \n- 1 tbsp dried oregano 🌿 \n- 1 sun-dried tomato (or 1 tbsp tomato paste) 🍅 \n- 2 tbsp olive oil \n- Salt and garlic powder to taste \n\n### Instructions \n1. Tear bread into pieces. Pulse in a blender/food processor until coarse crumbs form. \n2. Heat olive oil in a skillet over medium heat. \n3. Add bread crumbs, oregano, sun-dried tomato (finely chopped) or tomato paste, salt, and garlic powder. \n4. Toast for 3-5 minutes, stirring constantly, until golden and fragrant. \n5. Use as a topping for soups, salads, or roasted vegetables. \n\n***\n\n## Tomato-Oregano Bread Pizza 🍕🍅 \nQuick flatbread "pizzas" with a bright tomato-oregano topping. \n\n### Ingredients \n- 2 thick slices bread (or 1 flatbread/naan) 🍞 \n- 1 tomato 🍅, thinly sliced \n- 1 tsp dried oregano 🌿 \n- 2 tbsp olive oil \n- Salt and pepper to taste \n- Optional: garlic powder, red pepper flakes \n\n### Instructions \n1. Preheat oven or toaster oven to 200°C (400°F). \n2. Brush bread with 1 tbsp olive oil. Arrange tomato slices on top. \n3. Sprinkle with oregano, salt, pepper, and optional spices. \n4. Bake for 8-10 minutes until edges are crispy and tomatoes soften. \n5. Drizzle with remaining olive oil before serving."`)}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default Recipe;






'use client'



import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Import remarkGfm for GitHub Flavored Markdown

function Recipe({ content }) {


console.log("Before processing and stripping the double quotes . content : ", content) ;


while (content && content!== "" && content.startsWith('"')) { // Correct: Call startsWith with "
  console.log("startsWith is true") ;
  content = content.slice(1);
}

while (content && content!== "" && content.endsWith('"')) { // Correct: Call endsWith with "
  console.log("endsWith is true") ;
  content = content.slice(0, content.length - 1);
}

console.log("after processing and stripping the double quotes . content : ", content) ;
console.log("typeof content : ", typeof(content)) ;

  return (
  ( (content && content !== "") && ( <div className="recipe-container">
      <ReactMarkdown
        // Use remarkPlugins to enable GitHub Flavored Markdown (tables, task lists, strikethrough, etc.)
        remarkPlugins={[remarkGfm]}

        // You can optionally customize how specific Markdown elements are rendered.
        // For basic rendering, you often don't need this, but it's powerful for
        // more complex cases like code highlighting (as shown in your previous example).
        // For this specific content, we'll just demonstrate overriding a simple <p> tag.
        components={{
          // Example: Render paragraphs with a custom class
          p: ({ node, ...props }) => <p className="recipe-paragraph" {...props} />,
          // If you had code blocks and wanted syntax highlighting:
          // code: ({ node, inline, className, children, ...props }) => { /* ... your SyntaxHighlighter logic ... */ }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>)
   )

  );
}

export default Recipe;