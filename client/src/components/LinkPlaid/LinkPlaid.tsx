import * as React from 'react';

declare var window;

export default class LinkPlaid extends React.Component {
    public plaid: any;
    private access_token: string;

    constructor(props) {
        super(props);
        console.log('props :', props);

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
            key: '7ebb37e48ceec1f896d8cccad57c1b',
            product: ['transactions'],
            // Optional – use webhooks to get transaction and error updates
            // webhook: 'https://requestb.in',
            onLoad: () => {
                // Optional, called when Link loads
                console.log('onLoad');
            },
            onSuccess: (public_token, metadata) => {
                // Send the public_token to your app server.
                // The metadata object contains info about the institution the
                // user selected and the account ID or IDs, if the
                // Select Account view is enabled.
                const options = {
                    method: 'POST',
                    // mode: 'no-cors',
                    // cache: 'no-cache',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({public_token})
                }
                console.log('options :', options);
                fetch('http://localhost:3001/plaid/get_access_token/', options)
                    .then(json => json.json())
                    .then(data => {
                        console.log('data :', data)
                        this.access_token = data.access_token;
                        // const access_token = data.access_token,
                            // item_id = data.item_id;
                        
                        fetch('http://localhost:3001/plaid/auth')
                            .then(json => json.json())
                            .then(auth => {
                                console.log('auth :', auth);
                            })
                    })

            console.log('public_token :', public_token);
            console.log('metadata :', metadata);
            },
            onExit: (err, metadata) => {
                console.log('onExit', metadata);
                // The user exited the Link flow.
              if (err != null) {
                // The user encountered a Plaid API error prior to exiting.
              }
                // metadata contains information about the institution
                // that the user selected and the most recent API request IDs.
                // Storing this information can be helpful for support.
            },
            onEvent: (eventName, metadata) => {
                // Optionally capture Link flow events, streamed through
                // this callback as your users connect an Item to Plaid.
                // For example:
                // eventName = "TRANSITION_VIEW"
                // metadata  = {
                //   link_session_id: "123-abc",
                //   mfa_type:        "questions",
                //   timestamp:       "2017-09-14T14:42:19.350Z",
                //   view_name:       "MFA",
                // }
                console.log('eventName :', eventName);
                console.log('metadata :', metadata);
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
