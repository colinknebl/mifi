import * as React from 'react';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';

import AppNavigationBar from '../../components/AppNavigationBar/AppNavigationBar';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Budget from '../budget/budget';
import CreditMonitoringPage from '../CreditMonitoringPage/CreditMonitoringPage';

import { IBudgetGroupLineItem } from '../../mifi';

declare var window;

class App extends React.Component {

    public state = {
        // TODO: move these into state.app
        fetchedUser: null,
        isLoading: true,
        // =============================
        app: {
            budget: {
                budgetPlus: {
                    display: 'Graph'
                }
            }
        },
        user: {
            firstName: 'Colin',
            lastName: 'Knebl',
            email: 'colin.knebl@outlook.com',
            settings: {
                currency: 'USD'
            },
            accessToken: ['access-sandbox-e94b818a-24be-4fa6-b64f-1abe2a082b18']
        },
        finances: {
            banks: [
                { name: 'USAA' },
                { name: 'Lake Michigan Credit Union' }
            ],
            transactions: [
                { 
                    amount: { 
                        usd: -120.19
                    },
                    date: '2018-09-19',
                    description: 'MEIJER #232        Q01   MUSKEGO',
                    externalBankID: "fn45984204",
                    externalTransactionID: "fn6888261429",
                    ignored: false,
                    merchant: "Meijer",
                    allocated: []
                }
            ],
            budget: {
                budgetGroups: [
                    {
                        header: 'income',
                        draggable: true,
                        addable: true,
                        minimized: false,
                        maxLineItems: 20,
                        listPosition: 0,
                        lineItems: [
                            {
                                title: '2020 Paycheck 1 (9/6)',
                                planned: '197740',
                                actual: '197740',
                                listPosition: 0
                            },
                            {
                                title: '2020 Paycheck 2 (9/20)',
                                planned: '163742',
                                actual: '163742',
                                listPosition: 1
                            },
                            {
                                title: 'Drill Pay 9/18',
                                planned: '37689',
                                actual: '37689',
                                listPosition: 2
                            }
                        ]
                    },
                    {
                        header: 'tithing',
                        draggable: true,
                        addable: true,
                        minimized: false,
                        maxLineItems: 20,
                        listPosition: 1,
                        lineItems: [
                            {
                                title: 'Tithing',
                                planned: '000',
                                actual: '000',
                                listPosition: 0
                            }
                        ]
                    },
                    {
                        header: 'retirement',
                        draggable: true,
                        addable: true,
                        minimized: true,
                        maxLineItems: 20,
                        listPosition: 2,
                        lineItems: [
                            {
                                title: 'Retirement Fund',
                                planned: '000',
                                actual: '000',
                                listPosition: 0
                            }
                        ]
                    }
                ]
            }
        }
    }

    public methods = {
        financial: {
            addCurrencySymbol: this.addCurrencySymbol.bind(this),
            sum: this.sum.bind(this),
            formatAmount: this.formatAmount.bind(this),
            onLineItemTitleChange: this.onLineItemTitleChange.bind(this),
            addBudgetGroupLineItem: this.addBudgetGroupLineItem.bind(this),
            updateDisplayedInBudgetPlus: this.updateDisplayedInBudgetPlus.bind(this),
            updateBudgetGroupLineItemPosition: this.updateBudgetGroupLineItemPosition.bind(this)
        }
    }

    public routerProps: any;
    constructor(routerProps: any) {
        super(routerProps);
        this.routerProps = routerProps;

        // if (!this.state.fetchedUser) {
        //     fetch('http://localhost:3001/getUser')
        //         .then(data => data.json())
        //         .then(user => {
        //             console.log('data :', user);
        //         })
        // }

        // FIXME: don't forget to delete this
        window.state = this.state;
    }

    public render() {
        // if (this.state.isLoading) {
        //     return (
        //         <h1>Loading app data...</h1>
        //     )
        // }

        return (
            <main className="App">
                <AppNavigationBar {...{
                    user: this.state.user
                }} />
                <div className="App__content-container">
                    <Router>
                        <Switch>

                            <Route exact={true} path="/app/budget" render={routerProps => <Budget {...{
                                routerProps,
                                user: this.state.user,
                                finances: this.state.finances,
                                methods: this.methods
                            }} {...{state: this.state}} />} />

                            <Route exact={true} path="/app/credit-monitoring" render={props => <CreditMonitoringPage {...props} />} />
                            <Route exact={true} path="/app/dashboard" render={props => <Dashboard {...{
                                props,
                                state: this.state
                            }} />} />
                            <Redirect to="/app/dashboard" />
                        </Switch>
                    </Router>
                </div>
            </main>
        );
    }

    public addCurrencySymbol(amount: string): string {
        const { currency } = this.state.user.settings;
        if (currency === 'XX') {
            return '';
        } else {
            return '$' + amount;
        }
    }

    public sum(array: IBudgetGroupLineItem[], itemToTotal: string): string {
        return array.reduce((prev, lineItem): any => prev + parseInt(lineItem[itemToTotal], 10), 0).toString();
    }

    /**
     * @param amount the amount to be formatted
     */
    public formatAmount(amount: string) {
        let num;
        const afterDec = '.' + amount.substring(amount.length - 2, amount.length),
              beforeDec = amount.substring(0, amount.length - 2),
              len = beforeDec.length;
        if (len >= 4) {
            let beforeComma, afterComma1, afterComma2;
            if (len >= 4 && len < 7) {
                beforeComma = beforeDec.substring(0, len - 3);
                afterComma1 = beforeDec.substring(len - 3, len);
                num = beforeComma + ',' + afterComma1;
            } else if (len === 7) {
                afterComma2 = beforeDec.substring(len - 3, len);
                afterComma1 = beforeDec.substring(len - 3, len - (len - 1));
                beforeComma = beforeDec.substring(0, len - (len - 1));
                num = beforeComma + ',' + afterComma1 + ',' + afterComma2;
            } else if (len === 8) {
                afterComma2 = beforeDec.substring(len - 3, len);
                afterComma1 = beforeDec.substring(len - 3, len - (len - 2));
                beforeComma = beforeDec.substring(0, len - (len - 2));
                num = beforeComma + ',' + afterComma1 + ',' + afterComma2;
            } else if (len === 9) {
                afterComma2 = beforeDec.substring(len - 3, len);
                afterComma1 = beforeDec.substring(len - 3, len - (len - 3));
                beforeComma = beforeDec.substring(0, len - (len - 3));
                num = beforeComma + ',' + afterComma1 + ',' + afterComma2;
            } else {
                console.warn('Formatting amounts greater than 100 million are not supported.');
                num = null;
            }

        }
        return this.addCurrencySymbol((num || beforeDec) + afterDec);
    }

    public addBudgetGroupLineItem(e) {
        const budgetGroup = e.target.parentNode,
            listPosition = budgetGroup.getAttribute('data-listposition');

        this.setState((state: any) => {
            return state.finances.budget.budgetGroups[listPosition].lineItems = [...state.finances.budget.budgetGroups[listPosition].lineItems, {
                title: 'New Item',
                planned: '000',
                actual: '000',
                listPosition: state.finances.budget.budgetGroups[listPosition].lineItems.length
            }]
        });
    }

    public onLineItemTitleChange(event) {
        event.preventDefault();
        
        const groupNumber = event.target.getAttribute('data-groupnumber'),
            listPosition = event.target.getAttribute('data-listposition'),
            finances = this.state.finances,
            lineItem = this.state.finances.budget.budgetGroups[groupNumber].lineItems[listPosition],
            newTitle = event.target.value;
            
        lineItem.title = newTitle;

        this.setState(() => {
            return {
                finances: {...finances}
            }
        });
    }

    public updateDisplayedInBudgetPlus(event) {
        event.preventDefault();
        const app = this.state.app;
            app.budget.budgetPlus.display = event.target.getAttribute('title') || 'Graph';

        this.setState(() => {
            return {
                app: {...app}
            }
        });     
    }

    public updateBudgetGroupLineItemPosition(event) {
        const title = event.target.getAttribute('title'),
            elementPosition = parseInt(event.target.parentNode.getAttribute('data-listposition'), 10),
            budgetGroup = event.target.parentNode.parentNode.parentNode,
            budgetGroupPosition = parseInt(budgetGroup.getAttribute('data-listposition'), 10),
            budgetGroupListItems = Array.from(event.target.parentNode.parentNode.childNodes),
            budgetGroupLineItemsState = this.state.finances.budget.budgetGroups[budgetGroupPosition].lineItems,
            finances = this.state.finances;
        let removedElement;

        try {
            if (title === 'Move up list' && elementPosition !== 0) {
                removedElement = removeElementFromArray();
                budgetGroupLineItemsState.splice(elementPosition - 1, 0, removedElement);
                budgetGroupLineItemsState.map((item: any, index: number) => {
                    item.listPosition = index;
                    return item;
                });
                setLineItemsState.call(this)
            } else if (title === 'Move down list' && elementPosition !== budgetGroupListItems.length - 1) {
                removedElement = removeElementFromArray();
                budgetGroupLineItemsState.splice(elementPosition + 1, 0, removedElement);
                budgetGroupLineItemsState.map((item: any, index: number) => {
                    item.listPosition = index;
                    return item;
                });
                setLineItemsState.call(this)
            } else {
                throw new Error('Cannot move item')
            }
        } catch(err) {
            console.error('Error in updateBudgetGroupLineItemPosition:', err);
        }

        function removeElementFromArray() {
            return budgetGroupLineItemsState.splice(elementPosition, 1)[0];
        }

        function setLineItemsState(this: App) {
            this.setState(() => {
                return {
                    finances: {...finances}
                }
            })
        }
    }
}

export default App; 