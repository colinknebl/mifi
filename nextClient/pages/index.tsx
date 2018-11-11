import React from 'react';

class Index extends React.Component {
    render() {
        console.log('this.props in index :', this.props);
        return (
            <div>
                <h1>MiFi Landing Page</h1>
            </div>
        )
    }
}

export default Index;