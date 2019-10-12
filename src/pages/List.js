import React, { useState, useEffect } from 'react';
import api from '../services/api';
import socketio from 'socket.io-client';
import {
   AsyncStorage,
   Image,
   StyleSheet,
   SafeAreaView,
   ScrollView,
   Platform,
   TouchableOpacity,
   Text,
   View,
   Alert
} from 'react-native';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
   const [techs, setTechs] = useState([]);

   useEffect(() => {
      AsyncStorage.getItem('user').then(user_id => {
         const socket = socketio('http://192.168.15.65:3333', {
            query: {user_id}
         })
         socket.on('booking_response', booking => {
            Alert.alert('Atenção', 
            `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`)
         })
      })
   },[])

   useEffect(() => {
      AsyncStorage.getItem('techs').then(storagedTechs => {
         if (storagedTechs) {
            const techsArray =
               storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
         }else{
            getAllTechs();
         }

         async function getAllTechs() {
            const { data } = await api.get('/techs');
            const techsArray = [...new Set(data.toString().split(','))]
            setTechs(techsArray);    
         }
      })
   }, []);

   async function handleLogout() {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('techs');
      navigation.navigate('Login');
   }
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.logoBarContainer}>
            <Image style={styles.logo} source={logo} />
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
               <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
         </View>
         <ScrollView>
            {techs.map(tech => (
               <SpotList key={tech} tech={tech} />
            ))}
         </ScrollView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   logoBarContainer: {
      flexDirection: 'row',
      justifyContent: "center",
   },
   logoutText: {
      fontSize: 20,
      color: '#f05a5b',
      fontWeight: 'bold',
   },
   logoutButton: {
      alignSelf: 'center',
      height: 32,
      position: 'absolute',
      right: 0,
      paddingRight: 15
   },
   logo: {
      height: 32,
      alignSelf: 'center',
      resizeMode: 'contain',
      marginTop: Platform.OS === 'ios' ? 0 : 10,
      marginBottom: 15
   },
})

