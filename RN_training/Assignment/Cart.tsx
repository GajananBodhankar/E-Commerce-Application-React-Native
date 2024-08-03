import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useAppDispatch, useAppSelector } from './redux';
import { deleteCart } from './Redux/CartSlice';
import { style } from './styling';
const Cart = ({ navigation }: any) => {
  let content;
  var finalAmount = 0;
  var totalItems = 0;
  const [items, setItems] = useState<Number>(0);
  const [Amt, setAmt] = useState<Number>();
  const dispatch = useAppDispatch();
  const { mainCart } = useAppSelector(state => state.cartReducer);
  const Disp = ({ item }: any) => {
    var tempCount = item.count;
    var totalPrice = 0;
    var countItems = 0;
    while (tempCount >= 1) {
      totalPrice += item.price;
      countItems++;
      tempCount--;
    }
    finalAmount += totalPrice;
    totalItems += countItems;
    setItems(totalItems);
    setAmt(finalAmount);
    return (
      <View style={style.listView}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => navigation.navigate('Details', { item })}
            style={{ paddingTop: 10 }}>
            <Image
              source={{ uri: item.image }}
              resizeMode="contain"
              style={style.imageStyle}
            />
          </Pressable>
          <View style={style.container1}>
            <Text style={style.txt}>
              {item.count > 0 ? `${item.title}` : null}
            </Text>
            <Text style={style.text1}>
              {item.count > 0 ? `Quantity-${item.count}` : null}
            </Text>
            <Text style={style.totalPriceContainer}>
              {totalPrice > 0 ? `Total price- $${totalPrice}` : null}
            </Text>
            <View style={style.deleteItemView}>
              <Button
                title="delete Item"
                onPress={() => {
                  dispatch(deleteCart(item));
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  if (mainCart.length > 0) {
    content = (
      <View style={{ paddingBottom: 30, paddingTop: 10 }}>
        {mainCart.length > 0 ? (
          <View>
            <Text style={[style.txt, { paddingLeft: 10 }]}>
              The items selected are Displayed below
            </Text>
            <Text style={style.finalAmountView}>
              {mainCart.length > 0
                ? `The Final Amount- $${Amt?.toPrecision(
                    5,
                  )}\nTotal Items ${items}`
                : 0}
            </Text>
          </View>
        ) : (
          <Text style={[style.txt, { textAlign: 'center' }]}>
            The cart is empty!!
          </Text>
        )}
        <FlatList data={mainCart} renderItem={Disp} />
      </View>
    );
  } else {
    content = (
      <View style={style.mainView}>
        <Text style={[style.txt, { textAlign: 'center' }]}>
          The Cart is empty!!
        </Text>
        <Text style={style.finalAmountView}>
          The Final Amount-$0{'\n'}Total Items= 0
        </Text>
      </View>
    );
  }
  return (
    <View style={style.cartMainView}>
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
      {content}
    </View>
  );
};

export default Cart;
