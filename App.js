import {
  StyleSheet,
  View,
} from 'react-native';

import Rating from './Rating';
import React from 'react';

class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Rating 
          rating = {4}
          numStars = {7}
          starColor = "orange"
        ></Rating>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
});

export default App;