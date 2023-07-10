import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const Signup = async () => {
    try {
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(isUserCreated);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.header}>Email Authentication</Text>
      <TextInput
        placeholder="Enter your Email"
        style={style.textinput}
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        placeholder="Enter your Password"
        style={style.textinput}
        value={password}
        onChangeText={value => setPassword(value)}
      />
      <TouchableOpacity style={style.btn} onPress={() => Signup()}>
        <Text style={{color: '#fff', fontSize: 20}}>Signup </Text>
      </TouchableOpacity>

      <Text style={{color: 'red', fontSize: 15}}>{message}</Text>
    </View>
  );
};

export default Auth;

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
