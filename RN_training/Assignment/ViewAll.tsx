import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { style } from './styling';
const ViewAll = ({ navigation, route }: any) => {
  const data = route.params;
  const Disp = ({ item }: any) => {
    return (
      <View
        style={[
          style.flatViewAll,
          { backgroundColor: item.id % 2 == 0 ? 'khaki' : 'lightblue' },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { item })}>
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={style.flatImage}
          />
          <Text style={design.txt1}>{item.title}</Text>
          <Text style={design.txt2}>Price-${item.price}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={[style.touchable, { padding: 10 }]}>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios/256/circled-left-2.png',
          }}
          resizeMode="contain"
          style={{ height: 30, width: 30 }}
        />
        <Text style={style.back}> Back</Text>
      </TouchableOpacity>
      <Text style={style.categoryView}>{data[0].category}</Text>
      <FlatList data={data} renderItem={Disp} numColumns={2} />
    </View>
  );
};
const design = StyleSheet.create({
  txt1: { fontSize: 20, color: 'black' },
  txt2: { fontSize: 22, color: 'red' },
});
export default ViewAll;
