import * as React from 'react';

class TransactionHeaderIcon extends React.Component {
  private onClick: () => void;

  constructor(props) {
    super(props);
    this.onClick = props.onClick;
  }
    
  public render() {
    return (
      <button className="TransactionHeaderIcon" title="Transactions" onClick={this.onClick} >
        <i className="far fa-credit-card" aria-hidden="true" />
      </button>
    );
  }
}

export default TransactionHeaderIcon;