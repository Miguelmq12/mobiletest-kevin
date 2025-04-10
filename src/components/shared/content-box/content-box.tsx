import React, { ReactNode } from 'react';
import './content-box.css'; 

interface ContentBoxProps {
  content: ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({ content }) => {
  return (
    <div className="content-box">
      {content}
    </div>
  );
};

export default ContentBox;