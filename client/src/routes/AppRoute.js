import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PhoneBook from '../pages/PhoneBook';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PhoneBook} />
    </Switch>
  </BrowserRouter>
);

export default App;
