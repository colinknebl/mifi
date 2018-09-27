import * as React from 'react';

import './Dashboard.css';

class Dashboard extends React.Component {
    public routerProps: any;
    constructor(routerProps: any) {
        super(routerProps);
        this.routerProps = routerProps
    }

    public render() {

        return (
            <h1>Dashboard</h1>
        );
    }
}

export default Dashboard;