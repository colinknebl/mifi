import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Website from './Website/Website';

ReactDOM.render(<Website />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
