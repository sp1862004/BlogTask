import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Routes
import './App.css';
import Header from './Layout/Header';
import Home from './PAGES/Home/Home';
import ShowMorePage from './PAGES/Home/ShowMorePage';
import Index from './PAGES/Write/Index';
import Update from './PAGES/Write/Update';
import Footer from './Layout/Footer';


function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/ShowMorePage/:id" element={<ShowMorePage />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
        <Footer/>
      </Router >
    </>
  )
}

export default App
