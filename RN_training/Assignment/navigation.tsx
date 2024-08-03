import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FlatLst from './Home';
import TabStack from './TabStack';
import ViewAll from './ViewAll';
import Login from './login';
import Logout from './Logout';
import Details from './Details';

const Stack = createNativeStackNavigator();
const NavG = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Categories" component={FlatLst} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="ViewAll" component={ViewAll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavG;
