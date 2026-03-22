import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Props {
  event: Event;
  onPress: () => void;
}

export default function EventCard({ event, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {event.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.date}>
          📅 {new Date(event.date).toLocaleDateString('fr-FR')}
        </Text>
        <Text style={styles.location}>📍 {event.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#3b82f6',
  },
  location: {
    fontSize: 12,
    color: '#94a3b8',
  },
});