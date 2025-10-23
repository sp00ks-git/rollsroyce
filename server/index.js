const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/questionnaires', require('./routes/questionnaires'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/documents', require('./routes/documents'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
