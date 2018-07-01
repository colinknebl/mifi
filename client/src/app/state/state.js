import React, { Component } from 'react';

export const AppContext = React.createContext();

export class AppProvider extends Component {
  
  state = {
    name: 'Colin Knebl',
    age: 26,
    cool: true
  }

  increaseAge = function() {
    console.log(this);
    this.setState({
      age: this.state.age + 1
    })
  }


  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: {
          increaseAge: this.increaseAge.bind(this)       
        }
      }}>
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