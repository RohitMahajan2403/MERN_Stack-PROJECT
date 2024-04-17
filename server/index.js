const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());


app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;


const dataSchema = new mongoose.Schema({
    ts: {
      type: Date,
      required: true,
    },
    machine_status: {
      type: Number,
      required: true,
    },
    vibration: {
      type: Number,
      required: true,
    },
});

const SampleData = mongoose.model('SampleData', dataSchema);

// Route to fetch data
app.get('/', async (req, res) => {
  try {
    const data = await SampleData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/exam1",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { 
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((err) => { console.log("Error connecting to MongoDB: ", err); });



const calculateSummary = (data) => {
  const binaryString = data.map(item => item.machine_status.toString()).join('');
  const onesCount = binaryString.split('1').length - 1;
  const zerosCount = binaryString.split('0').length - 1;

  const continuousOnes = Math.max(...binaryString.split('0').map(ones => ones.length));
  const continuousZeros = Math.max(...binaryString.split('1').map(zeros => zeros.length));


  return {
    numberOfOnes: onesCount,
    numberOfZeros: zerosCount,
    continuousOnes,
    continuousZeros,
  };
};


app.get('/summary', async (req, res) => {
  try {
    const data = await SampleData.find(); 
    const summaryData = calculateSummary(data);
    res.json(summaryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});