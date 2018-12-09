import AppWrapper from '../../components/AppWrapper';
import Budget from '../../components/app/Budget/Budget';

const BudgetPage = props => (
	<AppWrapper {...props}>
		{appData => <Budget {...{ appData, props }} />}
	</AppWrapper>
);

export default BudgetPage;
