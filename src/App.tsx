import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootPage from './pages/RootPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<RootPage />} />
        </Routes>    
      </Router>
    </div>
  );
}

export default App;
