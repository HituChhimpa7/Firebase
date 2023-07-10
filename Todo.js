import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';

const Todo = () => {
  const [inputvalue, setInputvalue] = useState(null);
  const [list, setList] = useState(null);
  const [isUpdateData, setisUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      // const data = await database().ref('todo').once('value');
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          console.log(data);
          setList(tempData.val());
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleData = async () => {
    try {
      if (inputvalue.length > 0) {
        const index = list.length;
        const data = database().ref(`todo/${index}`).set({
          value: inputvalue,
        });
        console.log(data);
        setInputvalue('');
      } else {
        Alert.alert('Enter the value and try again');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateData = async () => {
    try {
      if (inputvalue.length > 0) {
        await database().ref(`todo/${selectedCardIndex}`).update({
          value: inputvalue,
        });
        setInputvalue('');
        setisUpdateData(false);
      } else {
        Alert.alert('can not be empty');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardPress = (cardIndex, cardValue) => {
    try {
      setisUpdateData(true);
      // console.log(cardIndex);
      setSelectedCardIndex(cardIndex);
      setInputvalue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLongPress = (cardIndex, cardValue) => {
    try {
      Alert.alert('Alert', `Are you sure to Delete ${cardValue}`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel is pressed');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              const response = await database()
                .ref(`todo/${cardIndex}`)
                .remove();
              console.log(response);
              setInputvalue('');
              setisUpdateData(false);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);
      // setisUpdateData(true);
      // setSelectedCardIndex(cardIndex);
      // setInputvalue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={style.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={style.header}>Todo App</Text>

        <TextInput
          placeholder="Enter your name"
          style={style.textinput}
          value={inputvalue}
          onChangeText={value => setInputvalue(value)}
        />
        {!isUpdateData ? (
          <TouchableOpacity style={style.btn} onPress={() => handleData()}>
            <Text style={{color: '#fff'}}>Add </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={style.btn}
            onPress={() => handleUpdateData()}>
            <Text style={{color: '#fff'}}>Update </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={style.cardContainer}>
        <Text style={{margin: 20, fontSize: 25, fontWeight: '500'}}>
          Todo List 
        </Text>

        <FlatList
          data={list}
          renderItem={item => {
            const cardIndex = item.index;
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={style.card}
                  onPress={() => handleCardPress(cardIndex, item.item.value)}
                  onLongPress={() =>
                    handleLongPress(cardIndex, item.item.value)
                  }>
                  <Text>{item.item.value}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default Todo;

const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  textinput: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: 'dodgerblue',
    width: width - 30,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
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
