import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import Login from "./components/Login/Login";
import Header from "./components/Layout/Header";
import Movies from "./components/Movies/Movies";


function App() {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default App;
