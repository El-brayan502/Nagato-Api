const ytdl = require('ytdl-core');
const fs = require('fs');
const express = require('express');
const app = express();

app.get('/download/ytmp3', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, error: 'URL requerida' });

    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

        res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
        res.setHeader('Content-Type', 'audio/mpeg');
        stream.pipe(res);
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
});

module.exports = app;