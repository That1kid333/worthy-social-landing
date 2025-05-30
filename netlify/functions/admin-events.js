const fs = require('fs');
const path = require('path');

// Admin password hash (same as in server.js)
const correctPasswordHash = '$2a$10$' + require('bcryptjs').hashSync('Worthy2025!', 10).slice(7);

const eventsPath = path.join(__dirname, '../../data/events.json');

exports.handler = async function(event, context) {
  // Check authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || !verifyAuth(authHeader)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    let events = [];
    if (fs.existsSync(eventsPath)) {
      events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    }

    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(events)
        };

      case 'POST':
        const newEvent = JSON.parse(event.body);
        newEvent.id = Date.now().toString();
        events.push(newEvent);
        fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
        return {
          statusCode: 200,
          body: JSON.stringify(newEvent)
        };

      case 'PUT':
        const updatedEvent = JSON.parse(event.body);
        const eventIndex = events.findIndex(e => e.id === updatedEvent.id);
        if (eventIndex === -1) {
          return { statusCode: 404, body: JSON.stringify({ error: 'Event not found' }) };
        }
        events[eventIndex] = updatedEvent;
        fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
        return {
          statusCode: 200,
          body: JSON.stringify(updatedEvent)
        };

      case 'DELETE':
        const { id } = JSON.parse(event.body);
        const filteredEvents = events.filter(e => e.id !== id);
        if (filteredEvents.length === events.length) {
          return { statusCode: 404, body: JSON.stringify({ error: 'Event not found' }) };
        }
        fs.writeFileSync(eventsPath, JSON.stringify(filteredEvents, null, 2));
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Event deleted' })
        };

      default:
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};

function verifyAuth(authHeader) {
  try {
    const token = authHeader.split(' ')[1];
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, password] = decoded.split(':');
    return require('bcryptjs').compareSync(password, correctPasswordHash);
  } catch {
    return false;
  }
}
