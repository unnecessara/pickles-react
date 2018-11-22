import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Write.css';
import React, { Component } from 'react';


class Write extends Component {

	constructor(props) {
		super(props);
		this.initialState = {
			content: '',
			alignment: ''
		};
		this.state = this.initialState;
	}

	handleContentChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
    };
    
    handleAlignmentChange = changeEvent => {
        console.log('Alignment changed to: ' + changeEvent.target.value);
    };

	submitForm = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	};

	render() {
		return (
			<form>
				<div className="form-group">
					<textarea
						name="content"
						className="input-area form-control"
						rows="15"
						cols="90"
						placeholder="Write Something"
						onChange={this.handleContentChange}
					/>
				</div>
				<div className="write-btns form-group">
					<label className="alignment-btn">
						<input
							type="radio"
							id="btn-left"
							name="alignment-option"
							value="left"
							autoComplete="off"
							onChange={this.handleAlignmentChange}
						/>
						<i className="fas fa-align-left" />
					</label>
					<label className="alignment-btn">
						<input
							type="radio"
							id="btn-center"
							name="alignment-option"
							value="center"
							autoComplete="off"
							onChange={this.handleAlignmentChange}
						/>
						<i className="fas fa-align-center" />
					</label>
					<label className="alignment-btn">
						<input
							type="radio"
							id="btn-right"
							name="alignment-option"
							value="right"
							autoComplete="off"
							onChange={this.handleAlignmentChange}
						/>
						<i className="fas fa-align-right" />
					</label>
					<input
						type="button"
						value="Pickle This"
						onClick={this.submitForm}
					/>
				</div>
			</form>
		);
	}
}

export default Write;