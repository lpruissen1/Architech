import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Screener } from './components/Screener/Screener';
import { Portfolios } from './components/Portfolios/Portfolios';
import { Education } from './components/Education/Education';
import { Home } from './components/Home/Home';
import { Profile } from './components/Profile/Profile';
import { Research } from './components/Research/Research';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/screener' component={Screener} />
			<Route exact path='/portfolios' component={Portfolios} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/research' component={Research} />
			<Route exact path='/education' component={Education} />
			<Route exact path='/profile' component={Profile} />
      </Layout>
    );
  }
}
