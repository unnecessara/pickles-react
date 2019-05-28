import './Read.css';
import React, { Component } from 'react';


class Read extends Component {

	handleRefreshClick = () => {
        this.props.refreshPickle();
	};

	handleEditClick = () => {
        this.props.editPickle(this.props.pickle.id);
	};

	handleDeleteClick = () => {
        this.props.removePickle(this.props.pickle.id);
	};

	render() {
		return <div>
				<div className="pickle-content">
					{this.props.pickle.content}
				</div>
				<div className="read-btns">
                <div id="delete-btn" onClick = {this.handleDeleteClick}>
						<i className="fas fa-trash" />
					</div>
					<div id="edit-btn" onClick={this.handleEditClick}>
						<i className="fas fa-pen" />
					</div>
					<div id="refresh-btn" onClick={this.handleRefreshClick}>
						<i className="fas fa-redo" />
					</div>
				</div>
			</div>;
	}
}

export default Read;