import React from 'react';

interface BottomActionsProps {
  onExit: () => void;
  onSubmit: () => void;
}

const BottomActions: React.FC<BottomActionsProps> = ({ onExit, onSubmit }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-around', 
      padding: '10px',    
      zIndex:99,          
    }}>
      <button
        onClick={onExit}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          width: '45%', 
        }}>
        Exit
      </button>
      <button
        onClick={onSubmit}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          width: '45%',           
        }}>
        Submit
      </button>
    </div>
  );
};

export default BottomActions;