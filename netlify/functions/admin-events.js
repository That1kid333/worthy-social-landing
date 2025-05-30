const supabase = require('./supabase');
const bcrypt = require('bcryptjs');

const ADMIN_PASSWORD_HASH = '$2a$10$' + bcrypt.hashSync('Worthy2025!', 10).slice(7);

// Original events data to restore
const eventsToRestore = [
  {
    "id": "00000000-0000-4000-8000-000000000001",
    "title": "Valentine's Day Wine Tasting",
    "date": "2025-02-14",
    "time": "19:00",
    "location": "Le Bilboquet",
    "description": "Join us for a romantic evening of wine tasting",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/valentine-s-day-wine-tasting"
  },
  {
    "id": "00000000-0000-4000-8000-000000000002",
    "title": "St. Patrick's Day Celebration",
    "date": "2025-03-17",
    "time": "17:00",
    "location": "Fado Irish Pub",
    "description": "Celebrate St. Patrick's Day with traditional Irish fare and music",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/st-patricks-day-celebration"
  },
  {
    "id": "00000000-0000-4000-8000-000000000003",
    "title": "Spring Equinox Yoga",
    "date": "2025-03-20",
    "time": "06:30",
    "location": "Piedmont Park",
    "description": "Welcome the spring with sunrise yoga in the park",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/spring-equinox-yoga"
  },
  {
    "id": "00000000-0000-4000-8000-000000000004",
    "title": "Easter Brunch",
    "date": "2025-04-20",
    "time": "11:00",
    "location": "Garden Room",
    "description": "Elegant Easter brunch with panoramic views",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/easter-brunch"
  },
  {
    "id": "00000000-0000-4000-8000-000000000005",
    "title": "Mother's Day Tea",
    "date": "2025-05-11",
    "time": "14:00",
    "location": "St. Regis Atlanta",
    "description": "Celebrate Mother's Day with high tea and champagne",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/mothers-day-tea"
  },
  {
    "id": "00000000-0000-4000-8000-000000000006",
    "title": "Family Dinner",
    "date": "2025-03-30",
    "time": "17:30",
    "location": "123 West Ridge Way, Roswell",
    "description": "Spaghetti Bolognese Gathering",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/family-dinner-a-la-bolognese"
  },
  {
    "id": "00000000-0000-4000-8000-000000000007",
    "title": "April Wednesdays: Park Walks",
    "date": "2025-04-03",
    "time": "18:15",
    "location": "Chastain Park (near The Chastain)",
    "description": "Weekly Walk at Chastain Park",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/wednesday-walk-in-chastain-park"
  },
  {
    "id": "00000000-0000-4000-8000-000000000008",
    "title": "Girls Night In",
    "date": "2025-04-04",
    "time": "19:30",
    "location": "99 West Paces",
    "description": "Noir Night - Ladies Only",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/girls-night-in"
  },
  {
    "id": "00000000-0000-4000-8000-000000000009",
    "title": "Dogwood Festival",
    "date": "2025-04-13",
    "time": "13:30",
    "location": "Piedmont Park (near Park Tavern)",
    "description": "Piedmont Park's Annual Celebration",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/dogwood-festival-at-piedmont-park"
  },
  {
    "id": "00000000-0000-4000-8000-000000000010",
    "title": "Cinco de Mayo",
    "date": "2025-05-05",
    "time": "19:00",
    "location": "Location TBD",
    "description": "Fiesta Celebration",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/fiesta-feast"
  },
  {
    "id": "00000000-0000-4000-8000-000000000011",
    "title": "Pom Before the Peel",
    "date": "2025-05-16",
    "time": "19:45",
    "location": "Pom Court & Speakeasy",
    "description": "Evening at Hotel Granda and May Peel",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/pom-before-the-peel"
  },
  {
    "id": "00000000-0000-4000-8000-000000000012",
    "title": "BBBB Event",
    "date": "2025-05-25",
    "time": "13:30",
    "location": "Bread & Butterfly, then Beltline",
    "description": "Brunch, Bread, Butterflies & Beltline",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/bbbb-brunch-bread-butterflies-beltline"
  },
  {
    "id": "00000000-0000-4000-8000-000000000013",
    "title": "Babes Brunch",
    "date": "2025-03-16",
    "time": "13:30",
    "location": "The Daily Buckhead",
    "description": "Ladies Only Brunch Event",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/babes-brunch"
  },
  {
    "id": "00000000-0000-4000-8000-000000000014",
    "title": "Test",
    "date": "2025-05-29",
    "time": "23:11",
    "location": "Atlanta, GA",
    "description": "Testing",
    "calendly_link": "https://calendly.com/elizabeth-myworthyevent-j_0a/valentine-s-day-wine-tasting"
  }
];

exports.handler = async function(event, context) {
  // Enable CORS for OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    };
  }

  // Check authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || !verifyAuth(authHeader)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    switch (event.httpMethod) {
      case 'POST':
        if (event.path === '/.netlify/functions/admin-events/restore') {
          // First, delete all existing events
          const { error: deleteError } = await supabase
            .from('events')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all events

          if (deleteError) throw deleteError;

          // Then insert all events
          const { data: insertedEvents, error } = await supabase
            .from('events')
            .insert(eventsToRestore);

          if (error) throw error;

          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Events restored successfully' })
          };
        } else {
          // Regular POST for single event
          const eventData = JSON.parse(event.body);
          const { data, error } = await supabase
            .from('events')
            .insert([eventData])
            .select()
            .single();

          if (error) throw error;

          return {
            statusCode: 200,
            body: JSON.stringify(data)
          };
        }

      case 'GET':
        const { data: events, error: getError } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true })
          .order('time', { ascending: true });

        if (getError) throw getError;

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(events)
        };

      case 'POST':
        const newEvent = JSON.parse(event.body);
        const { data: insertedEvent, error: insertError } = await supabase
          .from('events')
          .insert([newEvent])
          .select()
          .single();

        if (insertError) throw insertError;

        return {
          statusCode: 200,
          body: JSON.stringify(insertedEvent)
        };

      case 'PUT':
        const eventId = event.queryStringParameters?.id;
        if (!eventId) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing event ID' })
          };
        }

        const updatedEvent = JSON.parse(event.body);
        const { data: updated, error: updateError } = await supabase
          .from('events')
          .update({
            title: updatedEvent.title,
            date: updatedEvent.date,
            time: updatedEvent.time,
            location: updatedEvent.location,
            description: updatedEvent.description,
            calendly_link: updatedEvent.calendly_link,
            updated_at: new Date().toISOString()
          })
          .eq('id', eventId)
          .select()
          .single();

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }
        if (!updated) {
          return { statusCode: 404, body: JSON.stringify({ error: 'Event not found' }) };
        }

        return {
          statusCode: 200,
          body: JSON.stringify(updated)
        };

      case 'DELETE':
        const id = event.queryStringParameters?.id;
        if (!id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing event ID' })
          };
        }

        const { error: deleteError } = await supabase
          .from('events')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Event deleted' })
        };

      default:
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Server error' })
    };
  }
};

function verifyAuth(authHeader) {
  try {
    const token = authHeader.split(' ')[1];
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, password] = decoded.split(':');
    return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  } catch {
    return false;
  }
}
