import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Firestore = () => {
  const [show, setShow] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await firestore()
        .collection('testing')
        .doc('cSbHotYFjkXH1IMsOty2')
        .get();
      console.log(data._data);
      setShow(data._data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Text>name:{show ? show.name : 'Loading ...'}</Text>
      <Text>email:{show ? show.gmail : 'Loading ...'}</Text>
      <Text>language:{show ? show.language : 'Loading ...'}</Text>
      <Text>address:{show ? show.Village : 'Loading ...'}</Text>
      <Text>work:{show ? show.work : 'Loading ...'}</Text>
    </View>
  );
};

export default Firestore;
