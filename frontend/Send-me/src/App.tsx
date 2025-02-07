import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/main';
import Register from './components/registration';
import SendEmail from './components/send';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/send" element={<SendEmail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
