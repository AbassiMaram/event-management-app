'use client';

import { useState } from 'react';
import axios from 'axios';
import ClientsList from './ClientsList';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Props {
  event: Event;
  onDelete: (id: number) => void;
}

export default function EventCard({ event, onDelete }: Props) {
  const [showClients, setShowClients] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${event.id}`);
      onDelete(event.id);
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{event.description}</p>
          <p className="text-blue-500 text-sm mt-2">
            📅 {new Date(event.date).toLocaleDateString('fr-FR')}
          </p>
          <p className="text-gray-400 text-sm">📍 {event.location}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Supprimer
          </button>
          <button
            onClick={() => setShowClients(!showClients)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            {showClients ? 'Masquer' : 'Clients'}
          </button>
        </div>
      </div>
      {showClients && <ClientsList eventId={event.id} />}
    </div>
  );
}