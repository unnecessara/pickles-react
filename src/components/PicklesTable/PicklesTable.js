import React, { Component } from 'react';

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
                <th>ID</th>
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
            <td>{pickle.id}</td>
            <td>{pickle.content}</td>
            <td>{pickle.alignment}</td>
            <td>{pickle.timestamp}</td>
            <td><button onClick={() => props.removePickle(index)}>Delete</button></td>
        </tr>;
    });

    return <tbody>{rows}</tbody>;
}

export default PicklesTable;