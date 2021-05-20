import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Screener } from './components/Screener/Screener';
import { Portfolios } from './components/Portfolios/Portfolios';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/screener' component={Screener} />
            <Route exact path='/portfolios' component={Portfolios} />
      </Layout>
    );
  }
}
