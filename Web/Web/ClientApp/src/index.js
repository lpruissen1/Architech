import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#57AF98',
			main: '#298B72',
			dark: '#1B5D4C',
		},
		error: {
			light: '#FFF2C5',
			main: '#FF644C',
			dark: '#B72629',
			contrastText: '#7A0E22',
		},
		warning: {
			light: '#FFF2C5',
			main: '#FFEAA8',
			dark: '#FFE192',
			contrastText: '#7A4F15'
		},
		info: {
			dark: '#005787',
			light: '#5DE3EA',
			main: '#0096BC',
			contrastText: '#002D5A'
		},
		success: {
			light: '#DFFDE4',
			main: '#9FF3BC',
			dark: '#5cd89f',
			contrastText: '#116762'
		},
	}
})

ReactDOM.render(
	<BrowserRouter basename={baseUrl}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</BrowserRouter>,
		rootElement);

registerServiceWorker();

