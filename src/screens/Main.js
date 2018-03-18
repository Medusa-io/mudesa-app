import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Toolbar,
  ToolbarAction,
  ToolbarContent,
} from 'react-native-paper';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { AuthorizationTable } from '../components';
import * as AuthorizationActions from '../actions/AuthorizationActions';
import { DEFAULT_MARGIN } from '../config/dimen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#fff',
  },
  title: {
    // fontFamily: 'serif',
  },
  icon: {
    // backgroundColor: yellow,
  },
  list: {
    paddingHorizontal: DEFAULT_MARGIN,
  },
});

class Main extends React.Component {
  static propTypes = {
    navigation: PropTypes.objectOf(PropTypes.any).isRequired,
    getAuthorizations: PropTypes.func.isRequired,
    authorizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.onImagePress = this.onImagePress.bind(this);
  }

  state = {
    activeItem: undefined,
  }

  componentDidMount() {
    this.props.getAuthorizations();
  }

  onImagePress = () => console.log('imagePress');

  onItemPress = ({ _id: id }) => {
    if (id === this.state.activeItem) {
      this.setState({ activeItem: undefined });
    } else {
      this.setState({ activeItem: id });
    }
  }

  handleMenuPress = () => this.props.navigation.navigate('DrawerOpen')

  handleNotificationPress = () => { }

  render() {
    const { authorizations } = this.props;
    const { activeItem } = this.state;

    return (
      <View style={styles.container}>
        <Toolbar
          icon="map"
          style={styles.toolbar}
          onPress={this.handleMenuPress}
        >
          <ToolbarAction
            icon="menu"
            color={styles.yellow}
            onPress={this.handleMenuPress}
            style={styles.icon}
          />

          <ToolbarContent
            title="Medusa"
            titleStyle={styles.title}
            color="#000"
          />

          <ToolbarAction
            color={styles.yellow}
            icon="notifications"
            onPress={this.handleNotificationPress}
            style={styles.icon}
          />
        </Toolbar>

        <AuthorizationTable
          containerStyle={styles.list}
          data={authorizations}
          onItemPress={this.onItemPress}
          activeItem={activeItem}
          onImagePress={this.onImagePress}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ authorization }) => ({ authorizations: authorization.authorizations });

const mapDispatchToProps = { getAuthorizations: AuthorizationActions.getAuthorizations };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
