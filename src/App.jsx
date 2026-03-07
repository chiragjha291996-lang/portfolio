import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllProjectsPage from './pages/AllProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

function App() {
  return (
    <Router>
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

