import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LinkPhonePage from './pages/LinkPhonePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LinkPhonePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
