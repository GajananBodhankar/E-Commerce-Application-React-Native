import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlatLst from './Home';
import Logout from './Logout';
import Cart from './Cart';
import Product from './Product';
const Tab = createBottomTabNavigator();
export default function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let x;
          if (route.name === 'Home') {
            iconName = focused
              ? (x =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/2048px-Home-icon.svg.png')
              : (x = 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png');
          } else if (route.name === 'Product') {
            iconName = focused
              ? (x = 'https://cdn-icons-png.flaticon.com/512/3114/3114633.png')
              : (x = 'https://cdn-icons-png.flaticon.com/512/2652/2652218.png');
          } else if (route.name == 'Setting') {
            iconName = focused
              ? (x = 'https://img.icons8.com/ios-filled/256/apple-settings.png')
              : (x = 'https://img.icons8.com/ios/256/apple-settings.png');
          } else if (route.name == 'Cart') {
            iconName = focused
              ? (x = 'https://img.icons8.com/ios-filled/256/shopping-cart.png')
              : (x = 'https://img.icons8.com/ios/256/shopping-cart.png');
          }
          return (
            <Image source={{ uri: x }} style={{ height: 30, width: 30 }} />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 18 },
      })}>
      <Tab.Screen name="Home" component={FlatLst} />
      <Tab.Screen name="Product" component={Product} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Setting" component={Logout} />
    </Tab.Navigator>
  );
}
