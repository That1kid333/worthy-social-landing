const fs = require('fs');
const path = require('path');

const events = [
    {
        id: '1',
        title: "Summer Rooftop Yoga",
        date: "2025-06-15",
        time: "8:00am",
        location: "Ponce City Market Rooftop",
        description: "Start your Sunday with a refreshing rooftop yoga session"
    },
    {
        id: '2',
        title: "Wine & Paint Night",
        date: "2025-06-20",
        time: "7:00pm",
        location: "Painting with a Twist - Buckhead",
        description: "Join us for a creative evening of painting and wine tasting"
    },
    {
        id: '3',
        title: "Sunset Beach Meditation",
        date: "2025-07-01",
        time: "6:30pm",
        location: "Lake Lanier Beach",
        description: "Relax and recharge with a guided meditation session by the water"
    },
    {
        id: '4',
        title: "Farm-to-Table Dinner",
        date: "2025-07-10",
        time: "6:00pm",
        location: "The Garden Room",
        description: "An exclusive dining experience featuring local seasonal ingredients"
    }
];

const eventsFile = path.join(__dirname, 'data', 'events.json');
fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
console.log('Test events have been added successfully!');
