import gql from 'graphql-tag';

export const USER_QUERY = gql`
	query USER_QUERY($id: ID!) {
		user(where: { id: $id }) {
			id
			email
		}
	}
`;

export const LOGGED_IN_USER_QUERY = gql`
	query {
		loggedInUser {
			id
			email
			firstName
			lastName
		}
	}
`;
