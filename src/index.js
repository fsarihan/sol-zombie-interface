import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {extendTheme} from "@chakra-ui/react"

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: "black",
				color: "white",
			},
			a: {
				color: "white",
				_hover: {
					// textDecoration: "underline",
				},
			},
		},
	},
	fonts: {
		heading: "Teko",
		body: "Teko",
	},
	colors: {
		zombie: {
			100: "#b9161d",
		},
	},

})
ReactDOM.render(
	<ChakraProvider theme={theme}>
		<App/>
	</ChakraProvider>,
	document.getElementById('root')
);


