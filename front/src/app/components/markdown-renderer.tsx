import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose dark:prose-invert prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Custom code block rendering with syntax highlighting
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
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
            );
          },
          // Custom heading styles
          h1({ children }) {
            return <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-[#e4e7f1]">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-[#e4e7f1]">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-[#e4e7f1]">{children}</h3>;
          },
          // Custom paragraph
          p({ children }) {
            return <p className="mb-4 text-gray-700 dark:text-[#8b92b8] leading-relaxed">{children}</p>;
          },
          // Custom list styles
          ul({ children }) {
            return <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-[#8b92b8]">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-[#8b92b8]">{children}</ol>;
          },
          // Custom link styles
          a({ children, href }) {
            return (
              <a 
                href={href} 
                className="text-[#00d4ff] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          // Custom blockquote
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-[#00d4ff] pl-4 italic my-4 text-gray-600 dark:text-[#8b92b8]">
                {children}
              </blockquote>
            );
          },
          // Custom horizontal rule
          hr() {
            return <hr className="my-8 border-gray-200 dark:border-[#00d4ff]/20" />;
          },
          // Custom table styles
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-200 dark:border-[#00d4ff]/20">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-100 dark:bg-[#1e2443]">{children}</thead>;
          },
          th({ children }) {
            return (
              <th className="border border-gray-200 dark:border-[#00d4ff]/20 px-4 py-2 text-left font-semibold text-gray-900 dark:text-[#e4e7f1]">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border border-gray-200 dark:border-[#00d4ff]/20 px-4 py-2 text-gray-700 dark:text-[#8b92b8]">
                {children}
              </td>
            );
          },
          // Custom image styles
          img({ src, alt }) {
            return (
              <img 
                src={src} 
                alt={alt} 
                className="rounded-lg my-4 max-w-full h-auto shadow-lg"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
