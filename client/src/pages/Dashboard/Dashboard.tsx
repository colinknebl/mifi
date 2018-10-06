import * as React from 'react';
import './Dashboard.css';

import LinkPlaid from '../../components/LinkPlaid/LinkPlaid';

interface IState {
    state: any;
}

class Dashboard extends React.Component<IState> {
    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <React.Fragment>
                <h1>Dashboard</h1>
                <LinkPlaid {...{
                    state: this.props.state
                }} />
            </React.Fragment>
        );
    }
}

export default Dashboard;