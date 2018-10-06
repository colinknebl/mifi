import * as React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import './TransactionHeaderIcon.css';

class TransactionHeaderIcon extends React.Component {
  private onClick: () => void;

  constructor(props) {
    super(props);
    this.onClick = props.onClick;
  }
    
  public render() {
    return (
      <button className="TransactionHeaderIcon" title="Transactions" onClick={this.onClick} >
        <i className="fa fa-credit-card" aria-hidden="true" />
      </button>
    );
  }
}

export default TransactionHeaderIcon;