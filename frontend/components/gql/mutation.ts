import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
	mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			id
			firstName
			lastName
			email
		}
	}
`;

export const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$firstName: String!
		$lastName: String!
		$email: String!
		$middleName: String
		$password: String!
		$confirmPassword: String!
		$zip: String!
	) {
		signup(
			firstName: $firstName
			lastName: $lastName
			email: $email
			middleName: $middleName
			password: $password
			confirmPassword: $confirmPassword
			zip: $zip
		) {
			id
		}
	}
`;
