import { Image, StyleSheet, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../src/Main';


export default function HomeScreen() {

  const Stack = createNativeStackNavigator();

  return (
    <>
    </>
    // <NavigationContainer >
    //   <Stack.Navigator initialRouteName="Main">
    //     <Stack.Screen name="Main" component={Main}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({

});
