import App, { Container } from 'next/app';
import Website from '../components/Website';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App<any> {
	static async getInitialProps(payload) {
		// console.log('payload', payload);
		const { Component, ctx, router } = payload;
		let pageProps: any = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		pageProps.router = router;
		return { pageProps };
	}

	render() {
		const { Component: PageToRender, apollo, pageProps } = this.props;
		return (
			<Container>
				<ApolloProvider client={apollo}>
					<Website>
						<PageToRender {...pageProps} />
					</Website>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withData(MyApp);
