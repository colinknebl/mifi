import * as React from 'react';


class CreditReportPage extends React.Component {
  public routerProps: any;
  constructor(routerProps: any) {
    super(routerProps);
    this.routerProps = routerProps
  }

  public render() {
    return (
      <main>
        Credit Report Monitoring Page
      </main>
    );
  }
}

export default CreditReportPage;
