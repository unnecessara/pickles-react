
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';
import Write from '../Write/Write';
import Read from '../Read/Read';
import PicklesTable from '../PicklesTable/PicklesTable'
import Pickles from '../Pickles/Pickles'


class App extends Component {

	render() {
		return (
			<Pickles />
		);
	}
}

export default App;
