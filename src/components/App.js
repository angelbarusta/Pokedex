import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";
import NotFound from "../components/NotFound";

const App = ({ selectPoke }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path={`/pokemon/${selectPoke.name}`}
            component={Pokemon}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    selectPoke: state.selectPoke,
  };
};

export default connect(mapStateToProps, null)(App);
