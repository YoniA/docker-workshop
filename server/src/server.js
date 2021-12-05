const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');

client = new Redis(
    process.env.REDIS_PORT || 6379,
    process.env.REDIS_HOST || '127.0.0.1'
);

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    await client.set('now', new Date())
    res.send({ message: 'Hello World!'});
});

app.post('/set', async (req, res) => {
    const { key, value } = req.body;
    console.log(req.body);
    const r = await client.set(key, value);
    if (r) {
        res.status(201).send('success');
    } else {
        res.status(500).send('oops');
    }
});

app.get('/get/:key', async (req, res) => {
    const value = await client.get(req.params.key);
    res.send({ value });
});

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

server.on('close', () => {
    // shutdown()
})

exports.app = app;
exports.server = server;
