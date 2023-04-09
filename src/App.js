import './App.css';
import Header from './components/Header';
import Player from './components/Player';
import mp3 from './test.mp3';

function App() {
  return (
    <div className="App">
      <Header />
      <Player src={mp3} />
    </div>
  );
}

export default App;
