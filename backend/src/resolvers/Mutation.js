const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto'); // used during the reset token generation

const Mutations = {
	async signup(parent, args, ctx, info) {
		// 1. make sure the passwords match
		if (args.password !== args.confirmPassword) {
			throw new Error('Passwords do not match');
		}
		delete args.confirmPassword;
		// 2. lowercase the email
		args.email = args.email.toLowerCase();
		// 3. hash the password
		const password = await bcrypt.hash(args.password, 10);
		// 4. create the user in the database
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password
				}
			},
			info
		);

		// 5. create the JWT token for the new user
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		// 6. set the JWT as a cookie on the response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 5 // 5 minute cookie
		});
		// 7. return the user to the browser
		return user;
	},

	async signIn(parent, args, ctx, info) {
		console.log('args', args);
		const { email, password } = args;
		// 1. check if there is a user with that email
		const user = await ctx.db.query.user({ where: { email: email } });
		if (!user) {
			throw new Error(`No user found for email ${email}`);
		}
		// 2. check if their password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error(`Invalid password`);
		}
		// 3. generate the JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// 4. set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		});
		// 5. return the user
		return user;
	}
};

module.exports = Mutations;
