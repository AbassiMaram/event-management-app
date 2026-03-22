import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://192.168.43.57:5000';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, { name, email, password });
      login(res.data.user, res.data.token);
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>🎉 Créer un compte</Text>
        <Text style={styles.subtitle}>Rejoignez-nous et découvrez nos événements !</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#94a3b8"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe (min. 6 caractères)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#94a3b8"
        />

        <TouchableOpacity
          style={[styles.btn, loading && styles.disabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Création...' : 'Créer mon compte'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.link}
        >
          <Text style={styles.linkText}>
            Déjà un compte ?{' '}
            <Text style={styles.linkBold}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', justifyContent: 'center', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
  btn: { backgroundColor: '#22c55e', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  disabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#64748b', fontSize: 14 },
  linkBold: { color: '#22c55e', fontWeight: 'bold' },
});