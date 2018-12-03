import AppWrapper from '../../components/AppWrapper';
import Dashboard from '../../components/app/Dashboard/Dashboard';

const DashboardPage = props => (
	<AppWrapper>{appData => <Dashboard {...{ appData, props }} />}</AppWrapper>
);

export default DashboardPage;
