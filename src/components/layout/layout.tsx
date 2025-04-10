import React, { ReactNode } from 'react';
import TopBar from './topbar';

interface LayoutProps {
  children: ReactNode;
  title: string; 
}



const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <TopBar title={title} /> 
      <div>
        {children}
      </div>

    </div>
  );
};

export default Layout;
