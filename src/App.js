import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import SelectedEvents from './SelectedEvents';
import './App.css';

const mockEvents = [
  { id: 1, event_name: 'Butterfly 100M', event_category: 'Swimming', start_time: '2022-12-17 13:00:00', end_time: '2022-12-17 14:00:00' },
  { id: 2, event_name: 'Backstroke 100M', event_category: 'Swimming', start_time: '2022-12-17 13:30:00', end_time: '2022-12-17 14:30:00' },
  { id: 3, event_name: 'Freestyle 400M', event_category: 'Swimming', start_time: '2022-12-17 15:00:00', end_time: '2022-12-17 16:00:00' },
  { id: 4, event_name: 'High Jump', event_category: 'Athletics', start_time: '2022-12-17 13:00:00', end_time: '2022-12-17 14:00:00' },
  { id: 5, event_name: 'Triple Jump', event_category: 'Athletics', start_time: '2022-12-17 16:00:00', end_time: '2022-12-17 17:00:00' },
  { id: 6, event_name: 'Long Jump', event_category: 'Athletics', start_time: '2022-12-17 17:00:00', end_time: '2022-12-17 18:00:00' },
  { id: 7, event_name: '100M Sprint', event_category: 'Athletics', start_time: '2022-12-17 17:00:00', end_time: '2022-12-17 18:00:00' },
  { id: 8, event_name: 'Lightweight 60kg', event_category: 'Boxing', start_time: '2022-12-17 18:00:00', end_time: '2022-12-17 19:00:00' },
  { id: 9, event_name: 'Middleweight 75 kg', event_category: 'Boxing', start_time: '2022-12-17 19:00:00', end_time: '2022-12-17 20:00:00' },
  { id: 10, event_name: 'Heavyweight 91kg', event_category: 'Boxing', start_time: '2022-12-17 20:00:00', end_time: '2022-12-17 22:00:00' },
];

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    setEvents(mockEvents);
    const savedEvents = JSON.parse(localStorage.getItem('selectedEvents')) || [];
    setSelectedEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const handleSelect = (id) => {
    if (selectedEvents.length >= 3) {
      alert('You can only select up to 3 events.');
      return;
    }

    const eventToSelect = events.find((event) => event.id === id);
    const isConflicting = selectedEvents.some((selectedId) => {
      const selectedEvent = events.find((event) => event.id === selectedId);
      return (
        (eventToSelect.start_time >= selectedEvent.start_time && eventToSelect.start_time < selectedEvent.end_time) ||
        (eventToSelect.end_time > selectedEvent.start_time && eventToSelect.end_time <= selectedEvent.end_time)
      );
    });

    if (isConflicting) {
      alert('This event conflicts with another selected event.');
      return;
    }

    setSelectedEvents([...selectedEvents, id]);
  };

  const handleDeselect = (id) => {
    setSelectedEvents(selectedEvents.filter((selectedId) => selectedId !== id));
  };

  return (
    <div className="app">
      <div className="events-list">
        <h1>Sports Day Events</h1>
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
              isSelected={selectedEvents.includes(event.id)}
            />
          ))}
        </div>
      </div>
      <SelectedEvents
        selectedEvents={selectedEvents}
        events={events}
        onDeselect={handleDeselect}
      />
    </div>
  );
};

export default App;
