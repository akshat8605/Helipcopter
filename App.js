import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image,Animated, Easing } from 'react-native';
import fans from './assets/fans.png'
import main from './assets/main.png'

export default function App() {
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(()=>{
    startImageRotateFunction()
  },[])
  return (
    <View style={styles.container}>
      <Animated.Image source={main} style={{...styles.copter}}/>
      <Animated.Image source={fans} style={{...styles.fans, transform: [{rotate: rotateData}]}}/>
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
  copter:{
    width:"90%"
  },
  fans:{
    width:300,
    height:300,
    position:"absolute",
    top:"30%",
    left:"20%"
  }
});
