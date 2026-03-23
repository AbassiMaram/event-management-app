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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">

      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Cercles décoratifs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -top-10 right-0 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-indigo-300 text-sm font-medium tracking-widest uppercase">Plateforme</span>
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Gestion d'Événements
              </h1>
              <p className="text-slate-400 mt-2 text-sm">
                {events.length} événement{events.length > 1 ? 's' : ''} disponible{events.length > 1 ? 's' : ''}
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 ${
                showForm
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {showForm ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Fermer
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nouvel événement
                </>
              )}
            </button>
          </div>

          {/* Stats bar */}
          <div className="flex gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">{events.length}</p>
                <p className="text-slate-400 text-xs mt-0.5">Événements</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">∞</p>
                <p className="text-slate-400 text-xs mt-0.5">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-5xl mx-auto px-6 pb-12">

        {/* Formulaire */}
        {showForm && (
          <div className="mb-8 animate-in slide-in-from-top duration-300">
            <AddEventForm onEventAdded={handleEventAdded} />
          </div>
        )}

        {/* Liste */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-slate-400">Chargement des événements...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">Aucun événement</p>
              <p className="text-slate-400 text-sm mt-1">Créez votre premier événement en cliquant sur "Nouvel événement"</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
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