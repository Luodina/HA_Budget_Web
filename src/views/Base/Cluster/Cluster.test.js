import React from 'react';
import ReactDOM from 'react-dom';
import Cluster from './Cluster';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cluster />, div);
  ReactDOM.unmountComponentAtNode(div);
});
