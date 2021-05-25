import Loadable from "react-loadable";
import React from "react";
import FullScreenLoader from "components/FullScreenLoader/FullScreenLoader";

const Home = Loadable({
  loader: () => import(`containers/Home/Home`),
  loading() {
    return <FullScreenLoader />;
  }
});

export { Home };
