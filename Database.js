import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
const Database = () => {
  const [show, setShow] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await database().ref('users/1').once('value')
      console.log(data);
      setShow(data.val())
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Text>name:{show ? show.name : 'Loading ...'}</Text>
      <Text>email:{show ? show.gmail : 'Loading ...'}</Text>
      <Text>work:{show ? show.work : 'Loading ...'}</Text>
    </View>
  );
};

export default Database;
