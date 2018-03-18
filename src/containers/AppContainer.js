import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { initApiConfig } from '../config/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AppContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  componentWillMount() {
    initApiConfig();
  }

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
        />

        {children}
      </View>
    );
  }
}

export default AppContainer;
