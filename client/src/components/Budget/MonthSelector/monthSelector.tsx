import * as React from 'react';
import './monthSelector.css';
// import { Link } from 'react-router-dom';

class MonthSelector extends React.Component {
    
  public render() {
    return (
      <div className="MonthSelector">
        <h2 className="MonthSelector__month"><span className="font--dark">September</span> <span className="font--light">2018</span></h2>
      </div>
    );
  }
}

export default MonthSelector;