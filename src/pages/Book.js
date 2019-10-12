import React, { useState } from 'react';
import api from '../services/api';
import {
   SafeAreaView,
   Text,
   View,
   AsyncStorage,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   Alert
} from 'react-native';

export default function Book({ navigation }) {
   const [date, setDate] = useState('');
   const id = navigation.getParam('id');

   async function handleSubmit() {
      if (date) {
         const user_id = await AsyncStorage.getItem('user');

         await api.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } })

         Alert.alert('Solcitação de reserva realizada!');

         navigation.navigate('List');
      } else {
         Alert.alert('Atenção', 'A data da reserva precisa ser informada!');
      }
   }

   function handleCancel() {
      navigation.navigate('List');
   }

   return (
      <SafeAreaView >
         <View style={styles.container}>
            <Text style={styles.label}>Data de Interesse *</Text>
            <TextInput
               style={styles.input}
               placeholder="Digite a data que você deseja reservar"
               placeholderTextColor="#999"
               autoCapitalize="none"
               maxLength={10}
               onChangeText={setDate}
               value={date}
               autoCorrect={false} />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
               <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
               <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      margin: 30,
      marginTop: 50,
   },
   label: {
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
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
      borderRadius: 2,
      marginBottom: 10
   },
   cancelButton: {
      backgroundColor: '#ccc',
   },
   buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
   }
})