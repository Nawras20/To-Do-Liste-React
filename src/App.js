import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ToDoList from './components/toDoList/ToDoList';
import About from './components/about/About';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Navigate replace to="/todo-list" />} />
          <Route path="/todo-list" element={<ToDoList />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
