import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground, TextInput, ActivityIndicator, View } from 'react-native';
import {useState, useCallBack} from 'react';
//import axios from 'axios';

export default function App() {
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/4knature.jpg')}
      resizeMode="cover" style={styles.image}> 
        <View>
          <TextInput placeholder='Enter city name'
          onChangeText={text=>setInput(text)}
          value={input}
          placeholderTextColor={'#000'}
          style={styles.textInput}
          onSubmitEditing={fetchDataHandler}/>
        </View>

      

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
});
