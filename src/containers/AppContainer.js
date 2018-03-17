import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AppContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  componentDidMount() { }

  render() {
    const { children } = this.props;

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

export default AppContainer;
