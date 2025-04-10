import React from 'react';
import './bottom-actions.css'; 

interface BottomActionsProps {
  onExit: () => void;
  onSubmit: () => void;
}

class BottomActions extends React.Component<BottomActionsProps> {
  render() {
    const { onExit, onSubmit } = this.props;

    return (
      <div className="bottom-actions-container">
        <button className="bottom-actions-button exit-button" onClick={onExit}>
          Exit
        </button>
        <button className="bottom-actions-button submit-button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

export default BottomActions;