import React from 'react';
import Home from './Home';

export default class extends Home {
  render() {
    return <Home section="squad" {...this.props} />;
  }
}
