require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer'),
	db = require('./db'),
	cookieParser = require('cookie-parser'),
	jwt = require('jsonwebtoken');

const server = createServer();

// use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// use express middleware to populate current user
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		if (userId) {
			req.userId = userId;
		}
	}
	next();
});

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	details => {
		console.log(
			`Server is now running on port http://localhost:${details.port}`
		);
	}
);
