import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import authHeader from '../../auth/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

const getAsync = () =>
  console.log('GET ASYNC', AsyncStorage.getItem('@storage_Key'));

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
let dataJson;
let token;
let response_api;
const HomeScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const storage = async () => {
      let items = await AsyncStorage.getItem('@storage_Key');
      dataJson = JSON.parse(items);
      token = dataJson.access_token;
      console.log('GET STORAGE', dataJson.access_token);
    };
    storage();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Protected Home Screen</Text>
      <Button
        title="Get Pendaftaran"
        onPress={() =>
          axios
            .get('http://192.168.1.5:8082/api/pendaftaran', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res);
              response_api = res.data;
              setData(res.data);
            })
            .catch((error) => console.log(error, token))
        }
      />
      <FlatList
        data={data}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => (
          <Text>
            {item.namaPosyandu}, {item.kelurahan}, {item.rw}
          </Text>
        )}
      />
    </View>
  );
};

export default HomeScreen;
