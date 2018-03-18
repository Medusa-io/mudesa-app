import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {
  Toolbar,
  ToolbarAction,
  ToolbarContent,
} from 'react-native-paper';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

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
    paddingTop: DEFAULT_MARGIN,
  },
  modalContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
  },
  closeIcon: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: '500',
    fontSize: 18,
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
    this.showModal = this.showModal.bind(this);
  }

  state = {
    activeItem: undefined,
    modalStatus: false,
    image: undefined,
  }

  componentDidMount() {
    this.props.getAuthorizations();
  }

  onItemPress = ({ _id: id }) => {
    if (id === this.state.activeItem) this.setState({ activeItem: undefined });
    else this.setState({ activeItem: id });
  }

  handleMenuPress = () => this.props.navigation.navigate('DrawerOpen')

  handleNotificationPress = () => { }

  showModal = image => this.setState({ modalStatus: true, image })

  hideModal = () => this.setState({ modalStatus: false })

  render() {
    const { authorizations } = this.props;
    const { activeItem, modalStatus, image } = this.state;

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
          onImagePress={this.showModal}
        />

        <Modal
          isVisible={modalStatus}
          onBackdropPress={this.hideModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              <Text
                onPress={this.hideModal}
                style={styles.closeIcon}
              >
                X
              </Text>
            </View>

            {image
              ? (
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{ uri: image }}
                />
              )
              : null
            }
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ authorization }) => ({ authorizations: authorization.authorizations });

const mapDispatchToProps = { getAuthorizations: AuthorizationActions.getAuthorizations };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
