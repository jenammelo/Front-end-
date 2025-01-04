import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from './screens/notification';
import Reminder from './screens/Reminder';
import Messages from './screens/Messages';
import Chats from './screens/Chats';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Import the Icon from react-native-vector-icons

const Stack = createStackNavigator();

const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';
  if (routeName === 'Chats') {
    return false;
  }
  return true;
};

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notification">
          
          <Stack.Screen 
            name="Notification" 
            component={Notification} 
            options={({ navigation }) => ({
              headerTitle: () => (
                <Text style={{ fontWeight: 'bold', fontSize: 28, position: 'relative', left: '-90'}}>Notifications</Text>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: -9 }}>
                  <Icon name="chevron-left" size={34} color="black" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                  <Icon name="message-circle" size={34} color="black" style={{ marginRight: 10 }} />
                </TouchableOpacity>
              ),
              headerStyle: {
                height: 98, // Specify the height here
              },
            })}
          />
          
          <Stack.Screen name="Reminder" component={Reminder} />
          <Stack.Screen name="Messages" component={Messages}  options={({route}) =>({
            tabBarVisible: getTabBarVisibility(route),
          })} />
          <Stack.Screen name="Chats" component={Chats} options={({route}) =>({
            title: route.params.userName,
            headerBackTitle: false,
          })} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
