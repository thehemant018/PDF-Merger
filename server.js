import express from 'express';
import path from 'path';
const app = express();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import { mergerPDFS } from './merge.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static', express.static('public'));

let port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  try {
    // console.log(req.files);
    let d = await mergerPDFS(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path)
    );
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
