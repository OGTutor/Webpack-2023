import React from 'react';
import ReactDOM from 'react-dom/client';
import * as three from 'three';
import * as $ from 'jquery';
import './styles/style.css';
import json from '@/assets/json.json';
import xml from '@/assets/data.xml';
import csv from '@/assets/financial-year.csv';
import WebpackLogo from '@/assets/webpack-logo.png';
import './babel';
import Post from './Post';
import './styles/less.less';
import './styles/scss.scss';

const post = new Post('Webpack Post Title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

console.log('JSON', json);
console.log('XML', xml);
console.log('CSV', csv);

const root = ReactDOM.createRoot(document.getElementById('app'));

const App = () => {
	return (
		<div className='container'>
			<h1>Webpack</h1>
			<hr />
			<div className='logo' />
			<hr />
			<pre />
			<hr />
			<div className='box'>
				<h2>Less</h2>
			</div>
			<hr />
			<div className='card'>
				<h2>Scss</h2>
			</div>
		</div>
	);
};

root.render(<App />);
