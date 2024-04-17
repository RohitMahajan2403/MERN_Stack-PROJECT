import './App.css';
import DataSummary from './components/DataSummary';
import Navbar from './components/Navbar';
import Temp from './components/Temp';

function App() {
  return (
    <div className="App">

      <Navbar/>
      <DataSummary/>
      <Temp/>
      
    </div>
  );
}

export default App;
