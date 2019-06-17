import {Row, Col} from 'react-bootstrap';
import './Read.css';
import React from 'react';
import PropTypes from 'prop-types';

function Read (props) {

	const handleRefreshClick = () => {
        props.refreshPickle();
	};

	const handleEditClick = () => {
        props.editPickle(props.pickle.id);
	};

	const handleDeleteClick = () => {
        props.removePickle(props.pickle.id);
	};

    return (
        <div className="read-container">
            <Row>
                <Col 
                    className="pickle-content"
                    style={{
                        textAlign: props.pickle.alignment
                    }}
                >
                    {props.pickle.content}
                </Col>
            </Row>
            <Row className="read-btns justify-content-md-center">
                <div
                    id="delete-btn"
                    onClick={() => handleDeleteClick()}
                >
                    <i className="fas fa-trash" />
                </div>
                <div id="edit-btn" onClick={() => handleEditClick()}>
                    <i className="fas fa-pen" />
                </div>
                <div
                    id="refresh-btn"
                    onClick={() => handleRefreshClick()}
                >
                    <i className="fas fa-redo" />
                </div>
            </Row>
        </div>
    );

}

Read.propTypes = {
    pickle: PropTypes.object,
    refreshPickle: PropTypes.func,
    editPickle: PropTypes.func,
    removePickle: PropTypes.func
};

export default Read;