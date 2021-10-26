// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  useHistory,
  Switch,
} from "react-router-dom";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Router>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/search" component={} />
            <Route exact path="/account" component={Home} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
