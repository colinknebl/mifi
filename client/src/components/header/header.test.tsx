import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from './header';

it('Header renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('Adds correctly', () => {
//   expect(Header.add(1,1)).toBe(2)
// })