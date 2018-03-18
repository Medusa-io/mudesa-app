import { StackNavigator, DrawerNavigator } from 'react-navigation';

import {
  Splash,
  SignIn,
  SignUp,
  Main,
} from '../screens';
import { Drawer } from '../components';

const rootSettings = {
  headerMode: 'none',
};

const drawerSettings = {
  headerMode: 'none',
  contentComponent: Drawer,
};

const routes = StackNavigator({
  Splash: { screen: Splash },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  UserMain: {
    screen: DrawerNavigator({
      UserMain: { screen: Main },
    }, drawerSettings),
  },
}, rootSettings);

export default routes;
