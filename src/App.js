import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import "@fontsource/teko/400.css"
import "@fontsource/teko/700.css"
import MintPage from './pages/Mint';
import OnePage from './pages/OnePage';
import Whitelist from './pages/Whitelist';
import WhitelistCheck from './pages/WhitelistCheck';
import Wallet from './components/Wallet';
import {WalletBalanceProvider} from "./hooks/useWalletBalance";


function App() {
	return (
		<Wallet>
			<WalletBalanceProvider>
				<BrowserRouter>
					<Switch>
						<Route exact={true} path="/" component={OnePage}/>
						<Route exact={true} path="/whitelist" component={WhitelistCheck}/>
						<Route exact={true} path="/whitelist-check" component={WhitelistCheck}/>
						<Route exact={true} path="/mint" component={MintPage}/>
						<Redirect from="*" to="/"/>
					</Switch>
				</BrowserRouter>
			</WalletBalanceProvider>
		</Wallet>

	);
}

export default App;
