import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Read.css';
import React, { Component } from 'react';

class Read extends Component {

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
        return(
            <div>
                <div>
                    Text.. here.. a pickle
                </div>
                <div className="read-btns">
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
            </div>
        );
    }
}

export default Read;