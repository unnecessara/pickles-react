
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';

class PicklesMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			picklesUp: true
		};
	}

	handleClick = () => {
		this.setState((state, props) => ({
			picklesUp: !state.picklesUp
		}));
	}

	render() {
		const theWord = this.props.hasWrittenToday? 'yes': 'no';
		return (
			<div id="menu">
				<img src={require('./picklesUp.png')} id="title-img-up" alt="pickles up" style={{display: this.state.picklesUp ? 'block' : 'none'}} onClick={this.handleClick} />   
				<img src={require('./picklesDown.png')} id="title-img-down" alt="pickles down" style={{ display: this.state.picklesUp ? 'none' : 'block' }} onClick={this.handleClick} /> 

				<MenuButtons mode="read" picklesUp={this.state.picklesUp}/>
			</div>
		);
	}
}

class MenuButtons extends Component {

	handleRefreshClick = () => {
		console.log('Refresh Clicked!');
	}

	handleEditClick = () => {
		console.log('Edit Clicked!');
	}

	handleDeleteClick = () => {
		console.log('Delete Clicked!');
	}

	render() {

		if (this.props.mode === 'read') {
			return (
				<div className="menu-btns" style={{display: this.props.picklesUp ? 'none' : 'block'}}>
					<div id="refresh-btn" onClick={this.handleRefreshClick}>
						<i className="fas fa-redo" />
					</div>
					<div id="edit-btn" onClick={this.handleEditClick}>
						<i className="fas fa-pen" />
					</div>
					<div id="delete-btn" onClick={this.handleDeleteClick}>
						<i className="fas fa-trash" />
					</div>
				</div>
			);
		} else if (this.props.mode === 'write') {
			return (
				<div className="menu-btns" style={{ display: this.props.picklesUp ? 'none' : 'block' }}>
					<label className="alignment-btn">
						<input type="radio" id="btn-left" name="alignment-option" value="left" autocomplete="off" />
							<i className="fas fa-align-left"></i>
            		</label>
            		<label className="alignment-btn">
                		<input type="radio" id="btn-center" name="alignment-option" value="center" autocomplete="off" />
                    	<i className="fas fa-align-center"></i>
            		</label>
            		<label className="alignment-btn">
                		<input type="radio" id="btn-right" name="alignment-option" value="right" autocomplete="off" />
                    	<i className="fas fa-align-right"></i>
            		</label>
				</div>
			);
		}
		
	}
}

class EntryInput extends Component {
	constructor(props) {
		super(props);
		this.initialState = {
			content:'',
			alignment:''
		}
		this.state = this.initialState;
	}

	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}

	submitForm = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	}

	render() {
		const {content, alignment} = this.state;

		return (
			<form>
				<div className="form-group">
					<textarea name="content" className="input-area form-control" rows="20" cols="90" placeholder="Write Something" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label>Alignment: </label>
					<input type="text" name="alignment" value={alignment} onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<input type="button" value="Pickle This" onClick={this.submitForm} />
				</div>
			</form>
		);
	}
}

class PicklesTable extends Component {
	render() {
		return <table className="table">
				<TableHeader />
				<TableBody pickles={this.props.pickles} removePickle={this.props.removePickle} />
			</table>;
	}
}

const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>Content</th>
				<th>Alignment</th>
				<th>Date</th>
				<th>Remove</th>
			</tr>
		</thead>
	);
}

const TableBody = props => {
	const rows = props.pickles.map((pickle, index) => {
		return <tr key={index}>
				<td>{pickle.content}</td>
				<td>{pickle.alignment}</td>
				<td>{pickle.timestamp}</td>
				<td><button onClick={()=> props.removePickle(index)}>Delete</button></td>
			</tr>;
	});

	return <tbody>{rows}</tbody>;
}



// class PickleDisplay extends Component {
// 	render() {
// 		const pickles = this.props.pickles;
// 		const pickleToShow = pickles[Math.floor(Math.random() * pickles.length + 1)];
// 		return (
// 			<div>
// 				{pickleToShow.content} / { pickleToShow.alignment }
// 			</div>
// 		);
// 	}
// }



class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			entryText: '', 
			hasWrittenToday: false,
			pickles: [
				{
					content: 'something',
					alignment: 'center',
					timestamp: '2018-10-17 16:02:07'
				},
				{
					content: 'another pickle',
					alignment: 'center',
					timestamp: '2018-10-17 16:02:07'
				},
				{
					content: 'some shit',
					alignment: 'center',
					timestamp: '2018-10-17 16:02:07'
				},
				{
					content: 'hi',
					alignment: 'center',
					timestamp: '2018-10-17 16:02:07'
				},
				{
					content: 'blaaah',
					alignment: 'center',
					timestamp: '2018-10-17 16:02:07'
				},
				{
					content: 'Electronics',
					alignment: 'center',
					timestamp: '2018-10-17 16:02:07'
				}
			]
		};
	}

	removePickle = (index) => {
		const pickles = this.state.pickles;
		this.setState({
			pickles: pickles.filter((pickle, i) => {
				return i !== index;
			})
		});
	}

	handleSubmit = (pickle) => {
		this.setState({ pickles: [...this.state.pickles, pickle] });
	}

	render() {
		return (
			<div>
				<PicklesMenu hasWrittenToday={this.state.hasWrittenToday} />
				<div className="container main-content">
					<EntryInput handleSubmit={this.handleSubmit} />
					<PicklesTable pickles={this.state.pickles} removePickle={this.removePickle} />
				</div>
			</div>
		);
	}
}

export default App;
