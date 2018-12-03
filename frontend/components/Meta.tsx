import Head from 'next/head';

const Meta = () => (
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta charSet="utf-8" />
		<link rel="shortcut icon" href="/static/images/favicon.ico" />
		<title>Mifi</title>

		{/* Stylesheets */}
		<link
			rel="stylesheet"
			type="text/css"
			href="/static/css/nprogress.css"
		/>
		<link rel="stylesheet" type="text/css" href="/static/css/index.css" />
		{/* <link rel="stylesheet" type="text/css" href="/static/css/libs/fontawesome.min.css" /> */}
		<link
			rel="stylesheet"
			href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
			integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
			crossOrigin="anonymous"
		/>
	</Head>
);

export default Meta;
