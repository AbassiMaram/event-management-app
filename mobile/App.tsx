import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import HomeScreen from './app/index';
import EventDetailScreen from './app/events/EventDetail';
import SignInScreen from './app/auth/signin';
import SignUpScreen from './app/auth/signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#3b82f6' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: '🎉 Événements' }} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Détail' }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Connexion' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Inscription' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}