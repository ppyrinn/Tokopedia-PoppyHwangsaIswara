import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { PokemonList, PokemonDetail, MyPokemonList, MyPokemonDetail } from '../pages';
import client from '../graphql/graphql';
import { ApolloProvider } from 'react-apollo';
import { TabBar, MobileNavbar } from '../components';

function App() {
	return (
		<Router>
			<ApolloProvider client={client}>
				<MobileNavbar/>
				<TabBar />
				<Switch>
					<Route path="/" exact render={(props) => <PokemonList {...props} />} />

					<Route path="/detail/:id" exact render={(props) => <PokemonDetail {...props} />} />

					<Route path="/mylist" exact render={(props) => <MyPokemonList {...props} />} />

					<Route path="/mylist/detail/:id" exact render={(props) => <MyPokemonDetail {...props} />} />

					<Redirect from="*" to="/" />
				</Switch>
			</ApolloProvider>
		</Router>
	);
}

export default App;
