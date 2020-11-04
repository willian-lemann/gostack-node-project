import express from 'express';

const app = express();

app.get('/', (request, response) => {
   return response.json({ message: 'OK' })
})

app.listen(3333, () => {
   console.log('server started on port 3333.');
})