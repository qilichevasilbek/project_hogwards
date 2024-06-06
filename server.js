const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

app.get('/api/camp/:id', async (req, res) => {
    const apiUrl = `http://api.edupulse.software/api/camp/${req.params.id}`;
    try {
        const fetch = (await import('node-fetch')).default; 
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.patch('/api/camp/:id', async (req, res) => {
    const apiUrl = `http://api.edupulse.software/api/camp/${req.params.id}`
    try {
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        if (!response.ok) {
            console.error('Error updating data:', response.statusText);
            return res.status(response.status).send(response.statusText);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Error updating data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
