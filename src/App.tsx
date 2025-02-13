import Frame from 'react-frame-component';
import './App.css';
import Widget from './widget';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Frame style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
        <Widget />
      </Frame>
    </div>
  );
}

export default App;
