import React, { ReactNode } from 'react';
interface ContentBoxProps {
  content: ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({ content }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      color: 'black',
      padding: '20px',
      borderRadius: '5px',
      border: '1px solid #ccc', 
      width: '100%', 
      boxSizing: 'border-box', 
      textAlign:'start',
      maxHeight: '400px',
      marginBottom:'20px',
      overflowY:'auto'
    }}>
      {content}
    </div>
  );
};
export default ContentBox;