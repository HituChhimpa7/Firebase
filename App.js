import {View, Text} from 'react-native';
import React from 'react';
import Todo from './Todo';
import Auth from './src/Authentication/Auth';
import Otp from './src/Authentication/Otp';
import Normal from './src/CRUD/Normal';
import Razorpay from './src/Payment Gateway/Razorpay';

const App = () => {
  return (
    <View style={{flex: 1}}>
      {/* <Todo /> */}
      {/* <Auth/> */}
      {/* <Otp /> */}
      <Razorpay/>
      {/* <Normal /> */}
    </View>
  );
};

export default App;
