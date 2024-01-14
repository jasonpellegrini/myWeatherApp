import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground, TextInput, ActivityIndicator, View } from 'react-native';
import React, {useState, useCallBack, useEffect} from 'react';
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

useEffect(() => {
  if (data) {
    console.log(data);
  }
}, [data]);

const convertKelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(0);
};

const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
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

        {data.main && (
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>{`${data.name}, ${data.sys.country}`}</Text>
            <Text style={styles.tempText}>{`${convertKelvinToFahrenheit(data.main.temp)}°F`}</Text>
            <Text style={styles.weatherText}>{`${capitalizeFirstLetter(data.weather[0].description)}`}</Text>
          </View>
        )}

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
    borderWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 19,
    borderRadius: 30,
    borderColor: 'rgba(200, 200, 200, 0.7)',
  },

  weatherText: {
    fontSize: 30,
    color: '#fff',
    marginVertical: 10,
  },

  titleText: {
    fontSize: 40,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '600',
  },

  tempText: {
    fontSize: 80,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '200',
  },

  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    padding: 20,
  },
});
