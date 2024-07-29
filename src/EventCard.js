import React from 'react';

const EventCard = ({ event, onSelect, isSelected, onDeselect }) => {
  const { event_name, event_category, start_time, end_time } = event;

  const formatTime = (time) => {
    const date = new Date(time);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="event-card">
      <div className="event-initial">{event_category.charAt(0)}</div>
      <h3>{event_name}</h3>
      <p>Category: {event_category}</p>
      <p>Time: {formatTime(start_time)} - {formatTime(end_time)}</p>
      {isSelected ? (
        <button onClick={() => onDeselect(event.id)}>Deselect</button>
      ) : (
        <button onClick={() => onSelect(event.id)}>Select</button>
      )}
    </div>
  );
};

export default EventCard;
