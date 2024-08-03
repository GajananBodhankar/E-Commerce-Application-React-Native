import React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useAppDispatch, useAppSelector } from './redux';
import { IncCart, DecCart, addToCart } from './Redux/CartSlice';
import { style } from './styling';
const Details = ({ route, navigation }: any) => {
  const { cart } = useAppSelector(state => state.cartReducer);

  const dispatch = useAppDispatch();
  let content;
  if (route.params) {
    const { item } = route.params;
    const cartFind = cart.find(i => i.id === item.id);
    content = (
      <ScrollView>
        <View style={{ paddingTop: 30, paddingRight: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={style.touchable}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios/256/circled-left-2.png',
              }}
              resizeMode="contain"
              style={{ height: 30, width: 30 }}
            />
            <Text style={style.back}> Back</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={{ height: 400, width: 400 }}
          />
          <View style={style.countContainer}>
            <Text style={design.priceStyle}>Price- ${item.price}</Text>
            <View style={design.completeCount}>
              <View style={design.countButton}>
                <Pressable
                  onPress={() => {
                    dispatch(DecCart(item));
                  }}>
                  <Text style={design.decView}>-</Text>
                </Pressable>
              </View>
              <Text style={style.countTxt}>{cartFind?.count ?? 0}</Text>

              <View style={design.countButton}>
                <Pressable
                  onPress={() => {
                    dispatch(IncCart(item));
                  }}>
                  <Text style={{ fontSize: 24, textAlign: 'center' }}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Text style={design.titleStyle}>{item.title}</Text>
          <Text style={design.descriptionStyle}>
            Description-{item.description}
          </Text>

          <View style={{ flexDirection: 'row', paddingLeft: 50 }}>
            <View style={style.addToCartButton}>
              <Button
                title="Add to cart"
                color="red"
                onPress={() => {
                  dispatch(addToCart());
                }}
              />
            </View>
            <View style={style.addToCartButton}>
              <Button
                title="Go to Cart"
                color="red"
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  return <View style={design.mainView}>{content}</View>;
};
const design = StyleSheet.create({
  mainView: { flex: 1, alignSelf: 'center' },
  countButton: {
    width: 50,
    alignSelf: 'center',
    backgroundColor: 'lightskyblue',
  },
  decView: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceStyle: {
    fontSize: 22,
    color: 'black',
    padding: 10,
  },
  titleStyle: {
    fontSize: 22,
    color: 'red',
    padding: 10,
  },
  descriptionStyle: {
    fontSize: 22,
    color: 'grey',
    padding: 10,
  },
  completeCount: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'flex-end',
  },
});
export default Details;
