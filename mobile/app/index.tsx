import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const API_URL = 'http://192.168.43.57:5000';

export default function HomeScreen({ navigation }: any) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authBar}>
        {user ? (
          <View style={styles.authRow}>
            <Text style={styles.authText}>👋 {user.name}</Text>
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={styles.loginBtn}
            >
              <Text style={styles.loginText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signupBtn}
            >
              <Text style={styles.signupText}>Inscription</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
      ) : events.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aucun événement disponible</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => navigation.navigate('EventDetail', { id: item.id })}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchEvents(); }} />
          }
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  authBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  authRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  authText: { fontSize: 14, color: '#374151', fontWeight: '600' },
  logoutBtn: { backgroundColor: '#fee2e2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  logoutText: { color: '#ef4444', fontSize: 13, fontWeight: '600' },
  loginBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  loginText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  signupBtn: { backgroundColor: '#f0fdf4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  signupText: { color: '#22c55e', fontSize: 13, fontWeight: '600' },
  loader: { flex: 1, justifyContent: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 16 },
  list: { padding: 16, gap: 12 },
});