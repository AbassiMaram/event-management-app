'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
  id: number;
  name: string;
  email: string;
}

interface Props {
  eventId: number;
}

export default function ClientsList({ eventId }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/events/${eventId}`
        );
        setClients(res.data.registeredClients);
      } catch (error) {
        console.error('Erreur chargement clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [eventId]);

  if (loading) return (
    <p className="text-gray-400 text-sm mt-3">Chargement des clients...</p>
  );

  return (
    <div className="mt-4 border-t pt-3">
      <h3 className="font-semibold text-gray-700 mb-2">
        Clients inscrits ({clients.length})
      </h3>
      {clients.length === 0 ? (
        <p className="text-gray-400 text-sm">Aucun client inscrit</p>
      ) : (
        <ul className="space-y-1">
          {clients.map((client) => (
            <li key={client.id} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              {client.name} — {client.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}