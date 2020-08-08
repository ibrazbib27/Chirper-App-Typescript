import * as React from "react";
import MyNavbar from "./navbar/MyNavbar";
import Footer from "./footer/Footer";
import NewChirp from "./chirp_maker/NewChirp";
import AllChirps from "./chirp_maker/AllChirps";
import About from "./about/About";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export interface Chirp {
	id: string;
	header: string;
	img_src: string;
	message: string;
	_created: string;
}

const App: React.FC<IAppProps> = (props) => {
	return (
		<>
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => (
							<>
								<MyNavbar />
								<Container className={"d-flex justify-content-center"} fluid>

									<Row
										className={
											"justify-content-center justify-content-lg-around mt-5 py-5"
										}
									>
										<AllChirps />
									</Row>

								</Container>
								<Footer />
							</>
						)}
					/>
					<Route
						exact
						path="/chirp/about"
						render={(props) => (
							<>
								<MyNavbar />
								<Container className={"d-flex justify-content-center"} fluid>

									<Row
										className={
											"justify-content-center align-self-center w-100"
										}
									>
										<About />
									</Row>

								</Container>
								<Footer />
							</>
						)}
					/>
					<Route
						exact
						path={["/chirp/add", "/chirp/:id/admin"]}
						render={(props) => (
							<>
								<MyNavbar />
								<Container className={"d-flex justify-content-center"} fluid>

									<Row className={"justify-content-center align-self-center w-100 py-5 mt-5"}>
										<NewChirp
											history={props.history}
											location={props.location}
											match={props.match}
										/>
									</Row>
								</Container>
								<Footer />
							</>
						)}
					/>
				</Switch>
			</Router>
		</>
	);
};

export interface IAppProps {}

export interface IAppState {
	name: string;
}

export default App;
