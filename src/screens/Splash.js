import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';

import * as AuthActions from '../actions/AuthActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
  },
});

class Splash extends React.Component {
  static navigationOptions = {
    title: 'Medusa',
  }

  static propTypes = {
    checkSession: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  componentDidMount() {
    const { checkSession, navigation } = this.props;
    checkSession(navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={logo}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    );
  }
}

const mapDispatchToProps = { checkSession: AuthActions.checkSession };

export default connect(null, mapDispatchToProps)(Splash);
