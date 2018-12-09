import Router from 'next/router';

/**
 * API to help with type definitions when routing with the Next.js router
 * @param pathname @type string @description path of where to navigate to @example '/app/budget'
 * @param query @type object @description key/value pairs of what to put as query params @example { id: 'usersidhere' }
 * @param pathnameAs @type string @description the desired look of the URL (does not use a hash) @example `/app/dashboard/${user.id.here}`
 */

export default function route(
	pathname: string,
	query?: object,
	pathnameAs?: string
) {
	Router.push(
		{
			pathname,
			query
		},
		pathnameAs
	);
}
