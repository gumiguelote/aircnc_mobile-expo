import React, { useState, useEffect } from 'react';
import {
   View,
   StyleSheet,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   KeyboardAvoidingView,
   Platform,
   AsyncStorage,
   Alert
} from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
   const [email, setEmail] = useState('');
   const [techs, setTechs] = useState('');

   useEffect(() => {
      AsyncStorage.getItem('user').then(user => {
         if (user) {
            navigation.navigate('List');
         }
      })
   }, [])

   async function handleSubmit() {
      if (email) {
         const response = await api.post('/sessions', {
            email
         });
      const { _id } = response.data;
      await AsyncStorage.setItem('user', _id);
      await AsyncStorage.setItem('techs', techs);

      navigation.navigate('List');
      }else{
          Alert.alert('Atenção', 'Você precisa informar um email!') ; 
      }
   }

   return (
      <KeyboardAvoidingView
         enabled={Platform.OS === 'ios'}
         behavior="padding"
         style={styles.container}>
         <Image source={logo} />
         <View style={styles.form}>
            <Text style={styles.label}>SEU E-MAIL *</Text>
            <TextInput
               style={styles.input}
               placeholderTextColor="#999"
               placeholder="Digite seu e-mail"
               keyboardType="email-address"
               autoCapitalize="none"
               onChangeText={setEmail}
               value={email}
               autoCorrect={false} />
            <Text style={styles.label}>TECNOLOGIAS *</Text>
            <TextInput
               style={styles.input}
               placeholderTextColor="#999"
               placeholder="Tecnologias de interesse"
               autoCapitalize="words"
               onChangeText={setTechs}
               value={techs}
               autoCorrect={false} />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
               <Text style={styles.buttonText}>ENCONTRAR SPOTS</Text>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   label: {
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
   },
   form: {
      alignSelf: 'stretch',
      paddingHorizontal: 30,
      marginTop: 30,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 45,
      marginBottom: 20,
   },
   button: {
      height: 42,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2
   },
   buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
   }
})