
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
					timestamp: 'October 17, 2018'
				},
				{
					content: 'another pickle',
					alignment: 'center',
					timestamp: 'October 18, 2018'
				},
				{
					content: 'some shit',
					alignment: 'center',
					timestamp: 'October 19, 2018'
				},
				{
					content: 'hi',
					alignment: 'center',
					timestamp: 'October 20, 2018'
				},
				{
					content: 'blaaah',
					alignment: 'center',
					timestamp: 'October 21, 2018'
				},
				{
					content: 'Electronics',
					alignment: 'center',
					timestamp: 'October 22, 2018'
				}
			],
            prompts: [
                "I lost",
                "Someone once told me ",
                "One time I ",
                "Last night I dreamt ",
                "A special place ",
                "The expression on her face ",
                "Nice things I want to hear ",
                "My mom never ",
                "This is why I'm not like that ",
                "If all else fails ",
                "In another life I ",
                "I never knew about ",
                "I miss this from my previous self ",
                "I wish I was less ",
                "I should try to be more ",
                "When it gets dark, I feel ",
                "One thing I want to do in the next season ",
                "One thing I did that was great this season",
                "Next year I want to do this better ",
                "I really like ",
                "I'm seriously bothered by ",
                "When I feel lonely ",
                "I'm not like my dad. I'm ",
                "I like the taste of ",
                "I like the smell of ",
                "I don't miss "
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
        let modeContent = this.state.hasWrittenToday ? <Read pickles={this.state.pickles} /> : <Write prompts={this.state.prompts} handleSubmit={this.handleSubmit} />;
		return (
			<div>
                <div id="logo">
                    <img src={require('./picklesUp.png')} alt="pickles up" />
                </div>
				<div className="container main-content">
                    {modeContent}

					<PicklesTable pickles={this.state.pickles} removePickle={this.removePickle} />
				</div>
			</div>
		);
	}
}

export default App;
