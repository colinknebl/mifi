import React, { Component } from 'react';
import Header from './Header';

class Page extends Component {
    
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}

        // console.log('Component.getInitialProps :', Component, router, ctx);
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {

        return (
            <main className="App">
                {/* <Header /> */}
                {/* loads the component */}
                {this.props.children}
            </main>
        );
    }
}

export default Page;