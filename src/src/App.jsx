import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './components/mainmenu';
import NotificationContainer from './components/notification';

function App() {
  return (
    <>
      <NotificationContainer />
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          {/* Puedes agregar más rutas aquí */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
