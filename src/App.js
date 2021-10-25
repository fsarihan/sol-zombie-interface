import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './pages/Home';
import HistoryPage from './pages/History';
import InfoPage from './pages/Info';
import RoadmapPage from './pages/Roadmap';
import MintPage from './pages/Mint';
import OnePage from './pages/OnePage';

import Wallet from './components/Wallet';
import {WalletBalanceProvider} from "./hooks/useWalletBalance";


function App() {
	return (
		<Wallet>
			<WalletBalanceProvider>
				<BrowserRouter>

					<Switch>
						<Route exact path="/" component={OnePage}/>
						<Route path="/mint" component={MintPage}/>
						<Redirect from="*" to="/"/>
					</Switch>
				</BrowserRouter>
			</WalletBalanceProvider>
		</Wallet>

	);
}

export default App;
