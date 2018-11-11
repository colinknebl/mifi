import * as React from 'react';

declare var window;

class LinkPlaid extends React.Component {
    public plaid: any;
    private access_token: string;
    // @ts-ignore
    private item_id: string;

    constructor(props) {
        super(props);

        this.access_token = props.state.user.accessToken[0];
    }

    public render() {
        return (
            <React.Fragment>
                <button className="LinkPlaid" onClick={this.openPlaid}>
                    Link
                </button>
                <button onClick={this.getTransactions}>
                    get transactions
                </button>
            </React.Fragment>
        );
    }

    public initPlaid = () => {
        this.plaid = window.Plaid.create({
            clientName: 'Plaid Quickstart',
            env: 'development', // production || sandbox || development
            key: '8a8e45e2715eb1df253d38aafb4460',
            product: ['transactions', 'auth'],
            // Optional – use webhooks to get transaction and error updates
            // webhook: 'https://requestb.in',
            // onLoad: () => {},
            // onExit: (err, metadata) => { },
            // onEvent: (eventName, metadata) => { },
            onSuccess: (public_token, metadata) => {
                // Send the public_token to your app server.
                // The metadata object contains info about the institution the
                // user selected and the account ID or IDs, if the
                // Select Account view is enabled.
                /**
                 * @param: metadata
                 * account: {
                 *      id: ,
                 *      mask: ,
                 *      name: ,
                 *      subtype: ,
                 *      type:
                 * },
                 * account_id: ,
                 * accounts: [
                 *      id: ,
                 *      mask: ,
                 *      name: ,
                 *      subtype: ,
                 *      type:
                 * ],
                 * institution: {
                 *      institution_id: ,
                 *      name: 
                 * },
                 * link_session_id: ,
                 * public_token: 
                 */
                const options = {
                    method: 'POST',
                    // mode: 'no-cors',
                    // cache: 'no-cache',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({public_token})
                }
                fetch('http://localhost:3001/plaid/get_access_token/', options)
                    .then(json => json.json())
                    .then(data => {
                        console.log('data :', data);
                        // Save the access_token and item_id in a secure datastore, 
                        // as they’re used to access Item data and identify webhooks, respectively.
                        this.access_token = data.access_token;
                        this.item_id = data.item_id;
                        
                        fetch('http://localhost:3001/plaid/auth')
                            .then(json => json.json())
                            .then(auth => {
                                console.log('auth :', auth);
                            })
                    })
            }
          });
    }

    private openPlaid = () => {
        this.initPlaid();
        this.plaid.open();
    }

    private getTransactions = () => {
        console.log('this :', this, this.access_token);
        const body = {
            access_token: this.access_token
        }
        console.log('body :', body);
        fetch('http://localhost:3001/api/get/transactions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        })
            .then(json => json.json())
            .then(transactions => {
                console.log('transactions :', transactions);
            })
    }
}

export default LinkPlaid;