import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import AppProvider from "./store/AppProvider";
import Login from "./components/Login/Login";
import Header from "./components/Layout/Header";
import Movies from "./components/Movies/Movies";
import MovieItemDetails from "./components/Movies/MovieItem/MovieItemDetails";


function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<main>
            <Movies />
          </main>}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/movie/:movieId" element={<MovieItemDetails />}>
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
