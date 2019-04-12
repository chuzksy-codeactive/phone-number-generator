import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setups';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <div>
    {title}
  </div>, document.getElementById('app'),
);

module.hot.accept();
