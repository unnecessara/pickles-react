import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Read.css';
import React, { Component } from 'react';


class Read extends Component {
	constructor(props) {
        super(props);
        let randomPickle = this.props.pickles[Math.floor(Math.random() * this.props.pickles.length)]
		this.state = {
            currentPickle: randomPickle,
			color: 'red'
		};
	}

	handleRefreshClick = () => {
		console.log('Refresh Clicked!');
		this.setState((state, props) => {
			const pickles = props.pickles;
			return {
				currentPickle:
					pickles[Math.floor(Math.random() * pickles.length)]
			};
		});
	};

	handleEditClick = () => {
		console.log('Edit Clicked!');
	};

	handleDeleteClick = () => {
		console.log('Delete Clicked!');
	};

	render() {
		return (
			<div>
				<div className="pickle-content">{this.state.currentPickle.content}</div>
				<div className="read-btns">
					<div id="delete-btn" onClick={this.handleDeleteClick}>
						<i className="fas fa-trash" />
					</div>
					<div id="edit-btn" onClick={this.handleEditClick}>
						<i className="fas fa-pen" />
					</div>
					<div id="refresh-btn" onClick={this.handleRefreshClick}>
						<i className="fas fa-redo" />
					</div>
				</div>
			</div>
		);
	}
}

export default Read;