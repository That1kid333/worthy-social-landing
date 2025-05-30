const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('.'));
app.use(session({
    secret: 'worthy-social-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Password hash (you may want to move this to a secure config file in production)
const correctPasswordHash = '$2a$10$' + bcrypt.hashSync('Worthy2025!', 10).slice(7);

// Events data file
const eventsFile = path.join(__dirname, 'data', 'events.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize events file if it doesn't exist
if (!fs.existsSync(eventsFile)) {
    fs.writeFileSync(eventsFile, '[]', 'utf8');
}

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Login endpoint
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (bcrypt.compareSync(password, correctPasswordHash)) {
        req.session.isAuthenticated = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Helper function to sort events chronologically
function sortEventsByDateTime(events) {
    return events.sort((a, b) => {
        const dateTimeA = new Date(a.date + 'T' + (a.time.match(/^\d{2}:\d{2}$/) ? a.time : convertTo24Hour(a.time)));
        const dateTimeB = new Date(b.date + 'T' + (b.time.match(/^\d{2}:\d{2}$/) ? b.time : convertTo24Hour(b.time)));
        return dateTimeA - dateTimeB;
    });
}

// Helper function to convert 12-hour time to 24-hour time
function convertTo24Hour(time12h) {
    if (!time12h) return '00:00';
    
    // If it's already in 24-hour format (e.g., "21:00")
    if (time12h.match(/^\d{2}:\d{2}$/)) return time12h;
    
    // Handle formats like "1:30pm", "12:00pm", etc.
    const timeStr = time12h.toLowerCase().trim();
    const isPM = timeStr.endsWith('pm');
    const timeOnly = timeStr.replace(/[ap]m$/, '').trim();
    
    let [hours, minutes] = timeOnly.split(':').map(num => parseInt(num));
    
    // Convert to 24-hour format
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Get all events (public endpoint)
app.get('/api/public/events', (req, res) => {
    const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
    const sortedEvents = sortEventsByDateTime(events);
    res.json(sortedEvents);
});

// Get all events (admin endpoint, requires auth)
app.get('/api/events', requireAuth, (req, res) => {
    const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
    const sortedEvents = sortEventsByDateTime(events);
    res.json(sortedEvents);
});

// Add new event (requires auth)
app.post('/api/events', requireAuth, (req, res) => {
    const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
    const newEvent = {
        id: Date.now().toString(),
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        description: req.body.description,
        calendlyLink: req.body.calendlyLink || ''
    };
    events.push(newEvent);
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
    res.json(newEvent);
});

// Update event (requires auth)
app.put('/api/events/:id', requireAuth, (req, res) => {
    const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
    const eventIndex = events.findIndex(e => e.id === req.params.id);
    if (eventIndex === -1) {
        res.status(404).json({ error: 'Event not found' });
        return;
    }
    events[eventIndex] = { ...events[eventIndex], ...req.body };
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
    res.json(events[eventIndex]);
});

// Delete event (requires auth)
app.delete('/api/events/:id', requireAuth, (req, res) => {
    const events = JSON.parse(fs.readFileSync(eventsFile, 'utf8'));
    const eventIndex = events.findIndex(e => e.id === req.params.id);
    if (eventIndex === -1) {
        res.status(404).json({ error: 'Event not found' });
        return;
    }
    events.splice(eventIndex, 1);
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
