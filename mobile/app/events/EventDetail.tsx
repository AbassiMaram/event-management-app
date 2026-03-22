import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://192.168.43.57:5000';

export default function EventDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { user, token } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  const fetchEventDetail = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/events/${id}`);
      setEvent(res.data.event);
      setClients(res.data.registeredClients);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user || !token) {
      Alert.alert(
        'Connexion requise',
        'Vous devez être connecté pour vous inscrire',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Se connecter', onPress: () => navigation.navigate('SignIn') }
        ]
      );
      return;
    }
    setRegistering(true);
    try {
      await axios.post(
        `${API_URL}/api/events/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('✅ Succès', 'Inscription réussie !');
      fetchEventDetail();
    } catch (error: any) {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur inscription');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#3b82f6" style={{ flex: 1 }} />;

  if (!event) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Événement non trouvé</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.infoText}>📅 {new Date(event.date).toLocaleDateString('fr-FR')}</Text>
        <Text style={styles.infoText}>📍 {event.location}</Text>
      </View>

      <TouchableOpacity
        style={[styles.registerBtn, registering && styles.disabled]}
        onPress={handleRegister}
        disabled={registering}
      >
        <Text style={styles.registerText}>
          {registering ? 'Inscription...' : "S'inscrire à l'événement"}
        </Text>
      </TouchableOpacity>

      <View style={styles.clientsSection}>
        <Text style={styles.clientsTitle}>👥 Clients inscrits ({clients.length})</Text>
        {clients.length === 0 ? (
          <Text style={styles.noClients}>Aucun client inscrit</Text>
        ) : (
          clients.map((client) => (
            <View key={client.id} style={styles.clientCard}>
              <Text style={styles.clientName}>{client.name}</Text>
              <Text style={styles.clientEmail}>{client.email}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerCard: {
    backgroundColor: '#3b82f6',
    padding: 24,
    margin: 16,
    borderRadius: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  description: { fontSize: 14, color: '#bfdbfe', marginBottom: 12 },
  infoText: { fontSize: 13, color: '#fff', marginBottom: 4 },
  registerBtn: {
    backgroundColor: '#22c55e',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabled: { opacity: 0.6 },
  registerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  clientsSection: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  clientsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  noClients: { color: '#94a3b8', fontSize: 14 },
  clientCard: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingVertical: 8 },
  clientName: { fontSize: 14, fontWeight: '600', color: '#374151' },
  clientEmail: { fontSize: 12, color: '#94a3b8' },
});