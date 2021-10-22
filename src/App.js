import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './pages/Home';
import HistoryPage from './pages/History';
import InfoPage from './pages/Info';
import RoadmapPage from './pages/Roadmap';
import MintPage from './pages/Mint';
import Header from './components/Header';

function App() {
	return (
		<>

			<BrowserRouter>
				<Header/>
				<Switch>
					<Route exact path="/" component={HomePage}/>
					<Route exact path="/history" component={HistoryPage}/>
					<Route exact path="/info" component={InfoPage}/>
					<Route exact path="/roadmap" component={RoadmapPage}/>
					<Route exact path="/mint" component={MintPage}/>
					{/*<Route exact path="/players" component={Players}/>*/}
					{/*<Route exact path="/prize" component={Prize}/>*/}
					<Redirect from="*" to="/"/>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
