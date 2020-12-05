import AsyncStorage from '@react-native-async-storage/async-storage';

export default function authHeader() {
  let data;

  const storage = async () => {
    let items = await AsyncStorage.getItem('@storage_Key');
    data = JSON.parse(items);
    console.log('GET STORAGE', data.access_token);
  };

  if (data && data.access_token) {
    return {
      Authorization: 'Bearer ' + data.access_token,
    };
  } else {
    return {};
  }
}
