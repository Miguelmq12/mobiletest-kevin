import React, { ReactNode } from 'react';
import TopBar from './topbar';
import BottomActions from '../shared/bottom-actions/bottom-actions';
import './layout.css'; // Importa un archivo CSS para estilos del Layout

interface LayoutProps {
  children: ReactNode;
  title: string;
  onExit?: () => void;
  onSubmit?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onExit, onSubmit }) => {
  return (
    <div className="layout-container">
      <div className="layout-topbar">
        <TopBar title={title} />
      </div>
      <div className="layout-body">
        {children}
      </div>
      {onExit && onSubmit && (
        <div className="layout-bottom-actions">
          <BottomActions onExit={onExit} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
};

export default Layout;