import React from 'react';

const SelectedEvents = ({ selectedEvents, events, onDeselect }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="selected-events">
      <h2>Selected Events</h2>
      {selectedEvents.length > 0 ? (
        selectedEvents.map((id) => {
          const event = events.find((e) => e.id === id);
          return (
            <div key={id} className="selected-event">
              <div className="event-initial">{event.event_category.charAt(0)}</div>
              <h4>{event.event_name}</h4>
              <p>Time: {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
              <button onClick={() => onDeselect(id)}>Remove</button>
            </div>
          );
        })
      ) : (
        <p>No events selected.</p>
      )}
    </div>
  );
};

export default SelectedEvents;
