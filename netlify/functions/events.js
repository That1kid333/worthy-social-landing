const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    const eventsPath = path.join(__dirname, '../../data/events.json');
    const eventsData = fs.readFileSync(eventsPath, 'utf8');
    const events = JSON.parse(eventsData);
    
    // Sort events by date and time
    const sortedEvents = events.sort((a, b) => {
      const dateTimeA = new Date(a.date + 'T' + convertTo24Hour(a.time));
      const dateTimeB = new Date(b.date + 'T' + convertTo24Hour(b.time));
      return dateTimeA - dateTimeB;
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(sortedEvents)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load events' })
    };
  }
};

function convertTo24Hour(time12h) {
  if (!time12h) return '00:00';
  
  if (time12h.match(/^\d{2}:\d{2}$/)) return time12h;
  
  const timeStr = time12h.toLowerCase().trim();
  const isPM = timeStr.endsWith('pm');
  const timeOnly = timeStr.replace(/[ap]m$/, '').trim();
  
  let [hours, minutes] = timeOnly.split(':').map(num => parseInt(num));
  
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
