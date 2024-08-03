import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { IProduct, fetchProduct } from './Redux/ProductSlice';
import { useAppDispatch, useAppSelector } from './redux';
import { IncCart } from './Redux/CartSlice';
import { style } from './styling';
const FlatLst = ({ navigation }: any) => {
  const { data, status } = useAppSelector(state => state.productReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  const [Main, setMain] = useState<IProduct[][]>();
  const [Arr1, set1] = useState<IProduct[]>([]);
  const [Arr2, set2] = useState<IProduct[]>([]);
  const [Arr3, set3] = useState<IProduct[]>([]);
  const [Arr4, set4] = useState<IProduct[]>([]);
  const [name, setName] = useState<string>('');
  useEffect(() => {
    if (status == 'fulfilled') {
      const array: IProduct[] = [];
      const array1: IProduct[] = [];
      const array3: IProduct[] = [];
      const array2: IProduct[] = [];
      data.forEach(i => {
        if (i.category == "men's clothing") {
          array.push({
            id: i.id,
            title: i.title,
            image: i.image,
            price: i.price,
            description: i.description,
            category: i.category,
            count: 1,
          });
        } else if (i.category == 'jewelery') {
          array1.push({
            id: i.id,
            title: i.title,
            image: i.image,
            price: i.price,
            description: i.description,
            category: i.category,
            count: 1,
          });
        } else if (i.category == 'electronics') {
          array2.push({
            id: i.id,
            title: i.title,
            image: i.image,
            price: i.price,
            description: i.description,
            category: i.category,
            count: 1,
          });
        } else if (i.category == "women's clothing") {
          array3.push({
            id: i.id,
            title: i.title,
            image: i.image,
            price: i.price,
            description: i.description,
            category: i.category,
            count: 1,
          });
        }
      });

      set1(array);
      set2(array1);
      set3(array2);
      set4(array3);
      setMain([array, array1, array2, array3]);
    }
  }, [data]);

  const Disp = ({ item }: any) => {
    var count = 0;
    return (
      <View
        style={[
          style.DispView,
          { backgroundColor: item.id % 2 == 0 ? 'khaki' : 'lightblue' },
        ]}>
        <TouchableOpacity
          onPress={() => {
            count++;
            navigation.navigate('Details', { item });
            if (count == 1) {
              dispatch(IncCart(item));
            }
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
  let content;
  if (status == 'fulfilled') {
    if (name.length == 0) {
      content = (
        <View style={{ flex: 1, paddingTop: 10 }}>
          <View style={style.HomeSubView}>
            <TextInput
              placeholder="Search"
              style={{
                fontSize: 22,
                width: 200,
              }}
              onChangeText={i => {
                var c = i.toLocaleLowerCase();
                const z = Main?.filter(j => j[0].category.startsWith(c));
                if (z?.length != 0 && i.length != 0) {
                  setMain(z);
                  setName(c);
                } else if (i.length == 0) {
                  setMain([Arr1, Arr2, Arr3, Arr4]);
                  setName('');
                }
              }}
            />
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png',
              }}
              style={style.searchIcon}
            />
          </View>
          <View style={style.separator} />
          <View>
            <Text style={style.categoryView}>
              {Arr1.length == 0 ? '' : Arr1[0].category}
            </Text>
            <TouchableOpacity
              style={style.viewAllTouchable}
              onPress={() => navigation.navigate('ViewAll', Arr1)}>
              <Text style={style.viewAll}>View all</Text>
            </TouchableOpacity>
            <FlatList horizontal={true} data={Main?.[0]} renderItem={Disp} />
            <View style={style.separator} />
            <Text style={style.categoryView}>
              {Arr2.length == 0 ? '' : Arr2[0].category}
            </Text>
            <TouchableOpacity
              style={style.viewAllTouchable}
              onPress={() => navigation.navigate('ViewAll', Arr2)}>
              <Text style={style.viewAll}>View all</Text>
            </TouchableOpacity>
            <FlatList horizontal={true} data={Main?.[1]} renderItem={Disp} />
            <View style={style.separator} />
            <Text style={style.categoryView}>
              {Arr3.length == 0 ? '' : Arr3[0].category}
            </Text>
            <TouchableOpacity
              style={style.viewAllTouchable}
              onPress={() => navigation.navigate('ViewAll', Arr3)}>
              <Text style={style.viewAll}>View all</Text>
            </TouchableOpacity>
            <FlatList horizontal={true} data={Main?.[2]} renderItem={Disp} />
            <View style={style.separator} />
            <Text style={style.categoryView}>
              {Arr4.length == 0 ? '' : Arr4[0].category}
            </Text>
            <TouchableOpacity
              style={style.viewAllTouchable}
              onPress={() => navigation.navigate('ViewAll', Arr4)}>
              <Text style={style.viewAll}>View all</Text>
            </TouchableOpacity>
            <FlatList horizontal={true} data={Main?.[3]} renderItem={Disp} />
            <View style={style.separator} />
          </View>
        </View>
      );
    } else if (name.length > 0) {
      content = (
        <View style={{ flex: 1, paddingTop: 10 }}>
          <View style={style.HomeSubView}>
            <TextInput
              placeholder="Search"
              style={{
                fontSize: 22,
                width: 200,
              }}
              onChangeText={i => {
                var c = i.toLocaleLowerCase();
                const z = Main?.filter(j => j[0].category.startsWith(c));
                if (z?.length != 0 && i.length != 0) {
                  setMain(z);
                  setName(c);
                } else if (i.length == 0) {
                  setMain([Arr1, Arr2, Arr3, Arr4]);
                  setName('');
                }
              }}
            />
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png',
              }}
              style={style.searchIcon}
            />
          </View>
          <View style={style.separator} />
          <View>
            <Text style={style.categoryView}>{Main?.[0][1].category}</Text>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => navigation.navigate('ViewAll', Main?.[0])}>
              <Text style={{ color: 'red' }}>View all</Text>
            </TouchableOpacity>
            <FlatList horizontal={true} data={Main?.[0]} renderItem={Disp} />
          </View>
        </View>
      );
    }
  } else {
    content = <ActivityIndicator />;
  }
  return <ScrollView>{content}</ScrollView>;
};

export default FlatLst;
