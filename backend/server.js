const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/songs', express.static(path.join(__dirname, 'public', 'songs')));


app.get('/api/songs', (req, res) => {
  const musicDir = path.join(__dirname, 'public', 'songs');
  fs.readdir(musicDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read songs directory' });
    }

    const songs = files
      .filter(file => file.endsWith('.mp3'))
      .map(file => ({
        name: file.replace('.mp3', ''),
        url: `/songs/${file}`, // relative path (important for deployment)
        filename: file,
      }));

    res.json(songs);
  });
});

 

const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendPath));


app.use((req, res, next) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
