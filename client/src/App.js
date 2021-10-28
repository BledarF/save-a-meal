// client/src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  useHistory,
  Switch,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Register from "./Components/Register/Register";
import SearchPage from "./Components/Search/SearchPage";
import Account from "./Components/Account/Account";

// CONTEXT API

export const userContext = React.createContext({
  // MAYBE GET FROM COOKIES INITIALLY?
  user: null,
  setUser: () => {},
});

function App() {
  const [data, setData] = useState(null);

  // CONTEXT API
  const [user, setUser] = useState("s");
  const value = { user, setUser };

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <userContext.Provider value={value}>
      <div className="App">
        <Navbar />
        <Router>
          <main>
            <Switch>
              <Route exact path={["/home", "/"]} component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/account" component={Account} />
            </Switch>
          </main>
        </Router>
        <Footer />
      </div>
    </userContext.Provider>
  );
}

export default App;
