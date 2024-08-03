import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {loginValidate} from './Redux/LoginSlice';
import {useAppDispatch, useAppSelector} from './redux';
const Login = ({navigation}: any) => {
  const [user, setU] = useState<string>();
  const [pwd, setP] = useState<string>();
  const {status} = useAppSelector(state => state.loginReducer);
  const dispatch = useAppDispatch();
  function Resetdata() {
    setP('');
    setU('');
  }
  let x;
  if (status == 'pending') {
    x = <ActivityIndicator />;
  }
  return (
    <View style={design.main}>
      <View>
        <TextInput
          placeholder="Enter name"
          style={design.txtIn}
          value={user}
          onChangeText={i => setU(i)}
        />
        <TextInput
          placeholder="Enter Password"
          style={design.txtIn}
          maxLength={26}
          value={pwd}
          secureTextEntry={true}
          onChangeText={j => setP(j)}
        />
        <Text style={{textAlign: 'center'}}>{x}</Text>
        <View style={design.button}>
          <Button
            title="Login"
            color="red"
            onPress={() => {
              dispatch(loginValidate({user, pwd, navigation, Resetdata}));

              if (status == 'pending') {
                <ActivityIndicator />;
              } else if (status == 'rejected') {
                console.warn('Invalid credentials');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
const design = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  txtIn: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 22,
    color: 'black',
    width: 250,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {width: 100, alignSelf: 'center'},
});
export default Login;
