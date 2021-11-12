require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(cors());

const baseUrl = 'https://api.coinranking.com/v2';

app.use('/coins', async (req, res, next) => {
    try {
        const { limit } = req.query;
        if (limit == 0) { const response = await axios.get(`${baseUrl}/coins`); res.send(response.data); }
        else { const response = await axios.get(`${baseUrl}/coins?limit=${limit}`); res.send(response.data); }
    } catch (err) {
        next(err);
    }
});

app.use('/coin/:coinId/history/:timePeriod', async (req, res, next) => {
    try {
        const { coinId, timePeriod } = req.params;
        const response = await axios.get(`${baseUrl}/coin/${coinId}/history?timePeriod=${timePeriod}`);
        res.send(response.data);
    } catch (err) {
        next(err);
    }
});

app.use('/coin/:coinId', async (req, res, next) => {
    try {
        const { coinId } = req.params;
        const response = await axios.get(`${baseUrl}/coin/${coinId}`);
        res.send(response.data);
    } catch (err) {
        next(err);
    }
});

app.use('/exchanges', async (req, res, next) => {
    try {
        const response = await axios.get(`${baseUrl}/exchanges`);
        res.send(response.data);
    } catch (err) {
        next(err);
    }
});

app.use('/exchange/:exchangeId', async (req, res, next) => {
    try {
        const { exchangeId } = req.params;
        const response = await axios.get(`${baseUrl}/exchange/${exchangeId}`);
        res.send(response.data);
    } catch (err) {
        next(err);
    }
});

app.use('/', (req, res) => {
    res.send('hello');
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));