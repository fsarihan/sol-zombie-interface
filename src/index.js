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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
