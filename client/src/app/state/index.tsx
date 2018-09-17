import * as React from 'react';

export const AppProviderState = {
  age: 26,
  cool: true,
  name: 'Colin Knebl'
}

export const AppContext = React.createContext(AppProviderState);

export class AppProvider extends React.Component {

  public state = AppProviderState;

  public increaseAge = function(this: AppProvider) {
    this.setState({
      age: this.state.age + 1
    })
  }


  public render() {
    return (
      <AppContext.Provider value={AppProviderState}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

/**
 * Use instructions:
 * 
 * 1. import the file
 * import { AppContext, AppPrpvoider } from 'paht/to/file';
 * 
 * 2. wrap the tag that needs access to the data in consumer tags and return a single tag
 * <AppContext>
 *   {(context) => (
 *     <React.Fragment>
 *       <p>{context.state.prop}</p>
 *       <p>{context.state.prop}</p>
 *     </React.Fragment> 
 *   )}
 * </AppContext>
 */