import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sidebar from './sidebar';

it('Sidebar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
