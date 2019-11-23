import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Api from './backend/api';


export default class App extends React.Component{
  componentDidMount = async () => {
    await Api.getUser();
  }

  render(){
    return (
      <View>
        <Text>testing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});