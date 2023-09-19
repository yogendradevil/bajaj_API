const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

const userData = {
  full_name: 'Yogendra_R_Bijapur',
  dob: '11092002',
  email: 'yogendra.bijapur2020@vitbhopal.ac.in',
  roll_number: '20BCY10065',
};


function findHighestAlphabet(arr) {
  const alphabets = arr.filter(item => typeof item === 'string' && item.length === 1 && item.match(/[a-zA-Z]/));
  if (alphabets.length === 0) {
    return [];
  }
  
  const sortedAlphabets = alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  return [sortedAlphabets[sortedAlphabets.length - 1]];
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    const numbers = data.filter(item => typeof item === 'number' || (!isNaN(item) && !isNaN(parseFloat(item))));
    const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && item.match(/[a-zA-Z]/));
    const highestAlphabet = findHighestAlphabet(alphabets);

    const response = {
      is_success: true,
      user_id: `${userData.full_name}_${userData.dob}`,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: 'Internal Server Error' });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

