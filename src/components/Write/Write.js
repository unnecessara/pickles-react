
import './Write.css';
import React, { Component } from 'react';


class Write extends Component {

	constructor(props) {
        super(props);

        const initialContent = this.props.editMode ? this.props.pickle.content : this.props.prompts[Math.floor(Math.random() * this.props.prompts.length)];
        const initialAlignment = this.props.editMode ? this.props.pickle.alignment : 'left';
        const initialDate = this.props.editMode ? this.props.pickle.timestamp : new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date());;
        const initialHasEnteredText = this.props.editMode ? true : false;

		this.initialState = {
            content: initialContent,
            alignment: initialAlignment,
            timestamp: initialDate,
            hasEnteredText: initialHasEnteredText,
		};
		this.state = this.initialState;
	}

	handleContentChange = event => {
        const newContent = event.target.value;
        const hasNewContent = newContent.length === 0 ? false : true;
		this.setState({
            content: newContent,
            hasEnteredText: hasNewContent
        });
    };
    
    handleAlignmentChange = changeEvent => {
        const selectedAlignment = changeEvent.target.value;
        console.log('Alignment changed to: ' + selectedAlignment);
        this.setState({
            alignment: selectedAlignment
        });
    };

    refreshPrompt = () => {
        const prompts = this.props.prompts;
        let randomPrompt = this.state.content;
        while (randomPrompt === this.state.content) {
            randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        }
        this.setState({
            content: randomPrompt
        });
    }

	submitForm = () => {
		this.props.handleSubmit(this.state);
		this.setState(this.initialState);
	};

	render() {
		return (
            <div>
                <form className="pure-form">
                    <fieldset className="pure-group">
                        <textarea
                            name="content"
                            className="input-area"
                            rows="15"
                            cols="95"
                            onChange={this.handleContentChange}
                            style={{
                                textAlign: this.state.alignment
                            }}
                            value={this.state.content}
                            autoFocus
                        />
                    </fieldset>
                    <fieldset className="write-btns">
                        <div className="pure-g">
                            <div className="pure-u-2-5">
                                <label className="alignment-btn">
                                    <input
                                        type="radio"
                                        id="btn-left"
                                        name="alignment-option"
                                        value="left"
                                        autoComplete="off"
                                        checked={
                                            this.state.alignment ===
                                            'left'
                                        }
                                        onChange={
                                            this.handleAlignmentChange
                                        }
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
                                        checked={
                                            this.state.alignment ===
                                            'center'
                                        }
                                        onChange={
                                            this.handleAlignmentChange
                                        }
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
                                        checked={
                                            this.state.alignment ===
                                            'right'
                                        }
                                        onChange={
                                            this.handleAlignmentChange
                                        }
                                    />
                                    <i className="fas fa-align-right" />
                                </label>
                            </div>
                            <div className="pure-u-1-5">
                                <p />
                            </div>
                            <div className="pure-u-2-5">
                                <div className="save-btns">
                                    <input
                                        type="hidden"
                                        name="timestamp"
                                        value={this.state.timestamp}
                                    />
                                    {!this.state.hasEnteredText && (
                                        <button
                                            className="pure-button button-small"
                                            onClick={this.refreshPrompt}
                                        >
                                            Refresh Prompt
                                        </button>
                                    )}
                                    <button
                                        className="pure-button pure-button-primary save-pickle-btn"
                                        onClick={this.submitForm}
                                    >
                                        Pickle This
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
	}
}

export default Write;