const supabase = require('./supabase');

function formatTime(time24) {
  if (!time24) return '';
  
  // If it's already in 12-hour format, return as is
  if (time24.toLowerCase().includes('am') || time24.toLowerCase().includes('pm')) {
    return time24;
  }

  try {
    const [hours24, minutes] = time24.split(':');
    const hours = parseInt(hours24);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes}${period}`;
  } catch (error) {
    return time24; // Return original if parsing fails
  }
}

exports.handler = async function(event, context) {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) throw error;

    // Format times to AM/PM
    const formattedEvents = events.map(event => ({
      ...event,
      time: formatTime(event.time)
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(formattedEvents)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
