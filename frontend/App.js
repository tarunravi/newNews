import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import React from 'react';
import axios from 'axios';
import { Keyboard } from 'react-native';

export default function App() {
  const [text, onChangeText] = React.useState('Enter article text');
  const [response, setResponse] = React.useState('');

  const generateSummary = async () => {
    Keyboard.dismiss()
    onChangeText("loading")

    var formdata = new FormData();
    formdata.append('article', text);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://172.16.2.194:5000/", requestOptions)
      .then(response => response.text())
      .then(result => setResponse(result))
      .then(() => onChangeText("Enter article text "))
      .catch(error => console.log('error', error));   
  }


  return (
    <SafeAreaView style={styles.root}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        keyboardType="default"
        returnKeyType="done"
        multiline={true}
        blurOnSubmit={true}
   
        onSubmitEditing={() => { generateSummary() }}

      />
      <Text style={styles.text}>
        {response}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
    width: "100%",
    height: "100%", 
   
  },
  input: {
    height: "20%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text : {
    height: "60%",
    margin: 12,
    borderWidth: 1,
    padding: 10,

  }
});
