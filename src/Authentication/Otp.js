import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const Otp = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmData, setConfirmData] = useState('');

  const sendOTP = async () => {
    try {
        const mobileno = '+91' +mobile
      const response = await auth().signInWithPhoneNumber(mobileno);
      setConfirmData(response);
      console.log(response );
      Alert.alert('OTP is sent');
    } catch (err) {
      console.log(err);
    }
  };

  const Submit = async() => {
    try { 
        const response = await confirmData.confirm(otp)
        console.log(response)
        alert('your number is verified')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        placeholder="Enter Mobile Number"
        style={style.textinput}
        onChangeText={value => setMobile(value)}
        inputMode='numeric'
      />
      <TouchableOpacity style={style.btn} onPress={() => sendOTP()}>
        <Text style={{color: '#fff', fontSize: 20}}>Send OTP </Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Enter OTP"
        maxLength={6}
        inputMode="tel"
        style={style.textinput}
        onChangeText={value => setOtp(value)}
      />
      <TouchableOpacity style={style.btn} onPress={() => Submit()}>
        <Text style={{color: '#fff', fontSize: 20}}>Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;
const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textinput: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: 'dodgerblue',
    width: width - 30,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: width - 40,
    padding: 20,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cardContainer: {marginVertical: 20, flex: 1},
});
