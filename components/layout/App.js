import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {push as pushState} from 'react-router-redux';
import {App} from '@machete-platform/core-bundle/components/layout';
import {Nav} from '@vitruvian-tech/machete-bundle/components/layout';
import * as Config from '@machete-platform/core-bundle/controllers/Config';
import * as Auth from '@machete-platform/core-bundle/controllers/Auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    const promises = [];

    if (!state['@machete-platform/core-bundle'].Config['@machete-platform/core-bundle']) {
      promises.push(dispatch(Config.components('@machete-platform/core-bundle')));
    }

    if (!Auth.isLoaded(state)) {
      promises.push(dispatch(Auth.load()));
    }

    return Promise.all(promises);
  }
}])

@connect(state => ({ user: state['@machete-platform/core-bundle'].Auth.user }), {pushState})

export default class extends App {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/dashboard');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    return (
      <App {...this.props} nav={<Nav/>}>
        {this.props.children}
      </App>
    );
  }
}