'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './components/EventCard';
import AddEventForm from './components/AddEventForm';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Erreur chargement événements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventAdded = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  const handleEventDeleted = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8 px-6 shadow">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🎉 Gestion d'Événements</h1>
            <p className="text-blue-100 mt-1">
              {events.length} événement(s) disponible(s)
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            {showForm ? '✕ Fermer' : '+ Ajouter'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Formulaire */}
        {showForm && (
          <AddEventForm onEventAdded={handleEventAdded} />
        )}

        {/* Liste des événements */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Chargement...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Aucun événement pour le moment
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Cliquez sur "+ Ajouter" pour créer le premier !
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={handleEventDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}