import React from 'react';
import { View, Button } from 'react-native';
import { useAppDispatch } from './redux';
import { delProduct } from './Redux/ProductSlice';
import { delLogin } from './Redux/LoginSlice';
import { style } from './styling';
import { emptyCart } from './Redux/CartSlice';
const Logout = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  return (
    <View style={style.logoutMainView}>
      <View style={style.logoutSubView}>
        <Button
          title="Log Out"
          onPress={() => {
            navigation.navigate('Login');
            dispatch(delLogin('logout'));
            dispatch(delProduct('logout'));
            dispatch(emptyCart('logout'));
          }}
        />
      </View>
    </View>
  );
};
export default Logout;
