import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Normal = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);
  const [btn, setBtn] = useState('Add');
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    handleAdd( )
  },[])

  const handleEdit = index => {
    setBtn('Update');
    setName(data[index].name);
    setAge(data[index].age);
    setAddress(data[index].address);
    setIndex(index);
  };

  const Delete = () => {
    const Array = data;
    // setData([...Array, {name: name, age: age, address: address}]);
    setAddress('');
    setAge('');
    setName('');
  };

  const handleAdd = () => {
    if (!name || !age || !address) {
      alert('Please fill all fields');
    } else {
      if (btn === 'Add') {
        const Array = data;
        setData([...Array, {name: name, age: age, address: address}]);
        setAddress('');
        setAge('');
        setName('');
      } else if (btn === 'Update') {
        const newData = {
          name: name,
          age: age,
          address: address,
        };
        data.splice(index, 1, newData);
        console.log(index)
      }
    }
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.header}>CRUD Normal</Text>
      <TextInput
        placeholder="Enter your Name"
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Enter your Age"
        style={styles.textInput}
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        placeholder="Enter your Address"
        style={styles.textInput}
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity onPress={handleAdd} style={{marginBottom: 40}}>
        <Text style={styles.btn}>{btn}</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={data}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: 'orange',
                width: '90%',
                padding: 6,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.age}</Text>
                <Text style={styles.text}>{item.address}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit(index)}>
                  <Text style={styles.btn1}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Delete}>
                  <Text style={styles.btn2}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Normal;
const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 10,
    height: 50,
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: 10,
  },
  btn1: {
    backgroundColor: '#4CAF',
    color: 'white',
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10,
  },
  btn2: {
    backgroundColor: '#f03',
    color: 'white',
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    paddingLeft: 15,
  },
});
