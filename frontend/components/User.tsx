import { Query } from 'react-apollo';
import { LOGGED_IN_USER_QUERY } from './gql/query';

const User = props => (
	<Query {...props} query={LOGGED_IN_USER_QUERY}>
		{payload => props.children(payload)}
	</Query>
);
export default User;
