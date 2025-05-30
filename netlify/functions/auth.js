const bcrypt = require('bcryptjs');

// Same password hash as in server.js
const correctPasswordHash = '$2a$10$' + bcrypt.hashSync('Worthy2025!', 10).slice(7);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    
    if (bcrypt.compareSync(password, correctPasswordHash)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          token: Buffer.from(`admin:${password}`).toString('base64')
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid password' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
