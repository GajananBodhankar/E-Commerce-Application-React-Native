import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { IProduct } from './Redux/ProductSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { style } from './styling';
import { IncCart } from './Redux/CartSlice';
const Product = ({ navigation }: any) => {
  const { data, status } = useAppSelector(state => state.productReducer);
  const dispatch = useAppDispatch();
  const [Arr1, set1] = useState<IProduct[]>([]);

  useEffect(() => {
    if (status == 'fulfilled') {
      const array: IProduct[] = [];
      data.forEach(item => {
        array.push({
          id: item.id,
          title: item.title,
          category: item.category,
          count: 1,
          price: item.price,
          image: item.image,
          description: item.description,
        });
      });
      set1(array);
    }
  }, [data]);

  const Disp = ({ item }: any) => {
    return (
      <View
        style={[
          style.productDisp,
          {
            backgroundColor: item.id % 2 == 0 ? 'khaki' : 'lightblue',
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', { item });
            dispatch(IncCart(item));
          }}>
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={style.flatImage}
          />
          <Text style={style.txt}>{item.title}</Text>
          <Text style={style.txt1}>Price-${item.price}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={style.mainView}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
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
      <View>
        <FlatList numColumns={2} data={Arr1} renderItem={Disp} />
        <View style={{ width: '100%', height: 2, backgroundColor: 'grey' }} />
      </View>
    </View>
  );
};

export default Product;
