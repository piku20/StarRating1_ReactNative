import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

class Rating extends React.Component{
    
    state={
      rating:this.props.rating ?? 1,
      animation: new Animated.Value(1),
      numStars: this.props.numStars ?? 5,
      starColor: this.props.starColor ?? '#6F3BD8',
    };
  
    rate = star => {
      this.setState({rating: star});
    };
  
    animate = ()=>{
      Animated.timing(this.state.animation, {
        toValue:2,
        duration:400,
        easing:Easing.ease,
        useNativeDriver: true,      
      }).start(()=>{
        this.state.animation.setValue(1);
      });
    };
    
    render(){
  
      let stars = [];
  
      const animateScale = this.state.animation.interpolate({
        inputRange:[1, 1.5, 2],
        outputRange:[1,1.4,1],
      });
  
      const animateOpacity = this.state.animation.interpolate({
        inputRange: [1,1.2,2],
        outputRange: [1,0.5, 1],
      });
  
      const animateWobble = this.state.animation.interpolate({
        inputRange:[1,1.25, 1.75, 2],
        outputRange:["0deg", '-3deg', '3deg', '0deg'],      
      });
  
      const animationStyle = {
        transform: [{scale: animateScale}, {rotate: animateWobble}],
        opacity: animateOpacity
      };
  
      for(let x=1; x<= this.state.numStars; x++){
        stars.push(
          <TouchableWithoutFeedback 
            key={x}
            onPress={()=> {
              this.rate(x), this.animate();
            }}
          >
            <Animated.View style = {x <= this.state.rating ? animationStyle : ""}>
              <Star
                filled = {x <= this.state.rating?true: false}
                color={this.state.starColor}
              ></Star>
            </Animated.View>          
          </TouchableWithoutFeedback>
        );
      }
  
      return(
        
          <View style={styles.ratingContainer}>
            {stars}
          </View>
        
      );
    }
  }
  
  class Star extends React.Component{
    render(){
      return(
        <Icon 
          name={this.props.filled === true ? "star" : "star-o"}
          size={32} 
          color={this.props.color}
          style={styles.star} 
        ></Icon>
      );
    }
  }
  
  const styles = StyleSheet.create({
    
    ratingContainer:{
      flexDirection:'row',
    },
    star:{
      marginHorizontal:6,
    },
  });
  
  export default Rating;