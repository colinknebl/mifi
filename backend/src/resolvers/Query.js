const { forwardTo } = require('prisma-binding');

const Query = {
	user: forwardTo('db'),
	async loggedInUser(parents, args, ctx, info) {
		console.log('querying logged in user...');
		if (!ctx.request.userId) {
			throw new Error('No user is logged in');
		}
		return ctx.db.query.user(
			{
				where: {
					id: ctx.request.userId
				}
			},
			info
		);
	}
};

module.exports = Query;
