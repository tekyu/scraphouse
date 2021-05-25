import PropTypes from 'prop-types';
import FullScreenLoader from 'components/FullScreenLoader/FullScreenLoader';
import Home from 'containers/Home/Home';
import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
  <Suspense fallback={<FullScreenLoader />}>
    <Switch>
      <Route path="/" exact render={() => <Home auth={false} />} />
    </Switch>
  </Suspense>
);

// Routes.propTypes = {
//   auth: PropTypes.bool
// };

export default Routes;
