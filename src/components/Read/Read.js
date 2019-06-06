import {Row, Col} from 'react-bootstrap';
import './Read.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
		return (
            <div className="read-container">
                <Row>
                    <Col 
                        className="pickle-content"
                        style={{
                            textAlign: this.props.pickle.alignment
                        }}
                    >
                        {this.props.pickle.content}
                    </Col>
                </Row>
                <Row className="read-btns justify-content-md-center">
                    <div
                        id="delete-btn"
                        onClick={this.handleDeleteClick}
                    >
                        <i className="fas fa-trash" />
                    </div>
                    <div id="edit-btn" onClick={this.handleEditClick}>
                        <i className="fas fa-pen" />
                    </div>
                    <div
                        id="refresh-btn"
                        onClick={this.handleRefreshClick}
                    >
                        <i className="fas fa-redo" />
                    </div>
                </Row>
            </div>
        );
	}
}

Read.propTypes = {
    pickle: PropTypes.object,
    refreshPickle: PropTypes.func,
    editPickle: PropTypes.func,
    removePickle: PropTypes.func
};

export default Read;