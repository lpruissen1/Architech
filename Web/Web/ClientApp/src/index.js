import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { App } from './components/App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgba(255,215,100)',
			dark: '#CCAC50'
		},
		secondary: {
			main: '#F6D743',
		},
		error: {
			light: '#FFF2C5',
			main: '#FF644C',
			dark: '#B72629',
			contrastText: '#7A0E22',
		},
		warning: {
			light: '#FFB396',
			main: '#FF6551',
			dark: '#B7282F',
		},
		info: {
			dark: '#005787',
			light: '#5DE3EA',
			main: '#0096BC',
			contrastText: '#002D5A'
		},
		success: {
			light: '#92ffe5',
			main: '#64ffda',
			dark: '#46b298',
		},
	}
})

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<div style={{ backgroundColor: '#303030' }}>
			<BrowserRouter basename={baseUrl}>
				<App />
			</BrowserRouter>
		</div>
	</MuiThemeProvider>,
	rootElement
);

registerServiceWorker();

