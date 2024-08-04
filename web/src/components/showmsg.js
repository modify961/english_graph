import React from 'react';
import { Flex } from '@chatui/core';
import ReactMarkdown from 'react-markdown'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ShowLLMMsg({ content }) {

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  return (
    <Flex style={{  background: 'var(--gray-7)', maxWidth:'90%' }}>
        <div className="llm-component">
            <ReactMarkdown components={components}  >
              {content}
            </ReactMarkdown>
        </div>
    </Flex>
  );
}

export default ShowLLMMsg;