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
import Search from "./Components/Search/Search";
import Account from "./Components/Account/Account";

function App() {
	const [data, setData] = useState(null);

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div className="App">
			<Navbar />
			<Router>
				<main>
					<Switch>
						<Route exact path={["/home", "/"]} component={Home} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/account" component={Account} />
					</Switch>
				</main>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
