
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import './App.css';
import Write from './Write';
import Read from './Read';


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
        let modeContent = this.state.hasWrittenToday ? <Read /> : <Write handleSubmit={this.handleSubmit} />;
		return (
			<div>
                <div id="logo">
                    <img src={require('./picklesUp.png')} alt="pickles up" />
                </div>
				<div className="container main-content">
                    {modeContent}
					{/* <PicklesTable pickles={this.state.pickles} removePickle={this.removePickle} /> */}
				</div>
			</div>
		);
	}
}

export default App;
