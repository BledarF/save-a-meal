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

export const bookingContext = React.createContext({
  // MAYBE GET FROM COOKIES INITIALLY?
  bookingStatus: true,
  setBookingStatus: () => {},
});

function App(props) {
  const [data, setData] = useState(null);
  const [sessionUpdate, setSessionUpdate] = useState(0);

  // CONTEXT API
  const [user, setUser] = useState("");
  const value = { user, setUser };

  useEffect(() => {
    if (sessionUpdate == 0) {
      checkSessionExists();
    }
  });

  async function checkSessionExists() {
    setSessionUpdate(1);
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/check`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(values),
      });
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      if (jsonResponse.id) {
        setUser(jsonResponse.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <userContext.Provider value={value}>
      <div className="App">
        <Router>
          <Navbar checkSessionExists={checkSessionExists} />
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
