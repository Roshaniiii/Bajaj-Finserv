const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// User details
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// POST Endpoint to process the data
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = data.filter((item) => /^\d+$/.test(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

    const highestAlphabet = alphabets.length
      ? [alphabets.reduce((a, b) => (a.toUpperCase() > b.toUpperCase() ? a : b))]
      : [];

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// GET Endpoint to return operation code
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

