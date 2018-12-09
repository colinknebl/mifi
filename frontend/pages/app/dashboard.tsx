import AppWrapper from '../../components/AppWrapper';
import Dashboard from '../../components/app/Dashboard/Dashboard';

const DashboardPage = props => (
	<AppWrapper {...props}>
		{appData => <Dashboard {...{ appData, props }} />}
	</AppWrapper>
);

export default DashboardPage;
