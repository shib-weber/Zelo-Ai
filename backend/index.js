const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Loads .env file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server is Ready')
})

// POST endpoint to handle chat
app.post('/chat', async (req, res) => {
const userMessage = req.body.message;

try {
    const response = await axios.post(
    'https://api.cohere.ai/v1/chat',
    {
        message: userMessage,
        model: 'command-r',
    },
    {
        headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json'
        }
    }
    );

    const botReply = response.data.text;
    res.json({ reply: botReply });

} catch (error) {
    console.error('Cohere error:', error.message);
    res.status(500).json({ reply: "Error contacting Cohere API." });
}
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

