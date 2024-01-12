import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground, TextInput, ActivityIndicator, View } from 'react-native';
import React, {useState, useCallBack} from 'react';
import axios from 'axios';

export default function App() {
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

const api = {
  key: '545bc18417d4844bcce4f5e114e4549a',
  baseUrl: 'http://api.openweathermap.org/data/2.5/',
};

const fetchDataHandler = async () => {
  try {
    setLoading(true);

    const response = await axios.get(`${api.baseUrl}weather?q=${input}&appid=${api.key}`);
    setData(response.data);

    console.log(data);

    setLoading(false);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/4knature.jpg')}
      resizeMode="cover" style={styles.image}> 
        <View>
          <TextInput placeholder='Enter city name...'
          onChangeText={text=>setInput(text)}
          value={input}
          placeholderTextColor={'#000'}
          style={styles.textInput}
          onSubmitEditing={fetchDataHandler}
          />

        </View>
          {loading && 
          <View>
            <ActivityIndicator size={"large"} color="#000"></ActivityIndicator>
          </View>}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: "#df8e00",
  }
});
