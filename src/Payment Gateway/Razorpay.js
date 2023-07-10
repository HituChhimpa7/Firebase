import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const Razorpay = () => {
  return (
    <View>
      <Text>Hii</Text>
      <TouchableOpacity
        onPress={() => {
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_2rqUkncTF8iai4',
            amount: '5000',
            name: 'Acme Corp',
            order_id: '', //Replace this with an order_id created using Orders API.
            prefill: {
              email: 'gaurav.kumar@example.com',
              contact: '9191919191',
              name: 'Gaurav Kumar',
            },
            theme: {color: '#53a20e'},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch(error => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
        }}>
        <Text> Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Razorpay;
