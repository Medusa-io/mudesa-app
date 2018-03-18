import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DEFAULT_MARGIN } from '../config/dimen';
import * as AuthActions from '../actions/AuthActions';
import { yellow, darkYellow } from '../config/colors';
import logo from '../assets/images/logo.png';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
    paddingTop: 60,
  },
  container: {
    flex: 1,
    padding: DEFAULT_MARGIN,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderBottomColor: '#000',
    color: '#000',
  },
  button: {
    marginTop: 30,
    backgroundColor: yellow,
    paddingVertical: 5,
    marginHorizontal: 0,
  },
  formContainer: {
    marginTop: DEFAULT_MARGIN,
  },
  logo: {
    width: '100%',
  },
  forgotText: {
    color: darkYellow,
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  registerText: {
    color: darkYellow,
    backgroundColor: 'transparent',
    marginTop: 20,
    alignSelf: 'center',
  },
});

class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleLoginPress = this.handleLoginPress.bind(this);
  }

  state = {
    email: '',
    password: '',
  }

  handleLoginPress = () => {
    const { login, navigation } = this.props;
    login(this.state, navigation);
  }

  handleRegisterPress = () => this.props.navigation.navigate('SignUp')

  handleForgotnPress = () => this.props.navigation.navigate('Forgot')

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Image
            source={logo}
            resizeMode="contain"
            style={styles.logo}
          />

          <View style={styles.formContainer}>
            <TextInput
              label="E-mail"
              underlineColor="#000"
              underlineColorAndroid="#000"
              placeholderTextColor="#000"
              selectionColor="#000"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={styles.borderBottomColor}
            />

            <TextInput
              label="Password"
              underlineColor="#000"
              underlineColorAndroid="#000"
              placeholderTextColor="#000"
              selectionColor="#000"
              keyboardType="email-address"
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={styles.borderBottomColor}
            />

            <Text
              style={styles.forgotText}
              onPress={this.handleForgotnPress}
            >
              Esqueci minha senha
            </Text>

            <Button
              onPress={this.handleLoginPress}
              style={styles.button}
              color="#fff"
            >
              Entrar
            </Button>

            <Text
              style={styles.registerText}
              onPress={this.handleRegisterPress}
            >
              Registrar
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = { login: AuthActions.login };

export default connect(null, mapDispatchToProps)(SignIn);
