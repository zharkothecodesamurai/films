import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import AppProvider from "./store/AppProvider";
import Login from "./components/Login/Login";
import Header from "./components/Layout/Header";
import Movies from "./components/Movies/Movies";


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
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
