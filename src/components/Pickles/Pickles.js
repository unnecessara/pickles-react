import React, { Component } from 'react';
import Write from '../Write/Write';
import Read from '../Read/Read';
import PicklesTable from '../PicklesTable/PicklesTable'
import './Pickles.css';
import 'purecss/build/pure.css';

class Pickles extends Component {
    constructor(props) {
        super(props);

        const picklesList = [
            {
                id: 0,
                content: 'something',
                alignment: 'center',
                timestamp: 'November 28, 2018'
            },
            {
                id: 1,
                content: 'another pickle',
                alignment: 'center',
                timestamp: 'October 18, 2018'
            },
            {
                id: 2,
                content: 'some stuff',
                alignment: 'center',
                timestamp: 'October 19, 2018'
            },
            {
                id: 3,
                content: 'hi',
                alignment: 'center',
                timestamp: 'October 20, 2018'
            },
            {
                id: 4,
                content: 'blaaah',
                alignment: 'center',
                timestamp: 'October 21, 2018'
            },
            {
                id: 5,
                content: 'Electronics',
                alignment: 'center',
                timestamp: 'October 22, 2018'
            }
        ];
        const promptsList = [
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
        ];
        const today = new Date();
        const date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(today);
        const todayPickleExists = picklesList.find((pickle) => pickle.timestamp === date);

        this.state = {
            pickles: picklesList,
            prompts: promptsList,
            currentPickle: picklesList[Math.floor(Math.random() * picklesList.length)],
            editMode: false,
            hasWrittenToday: todayPickleExists,
        };
    }

    editPickle = (id) => {
        const pickles = this.state.pickles;
        const editAt = pickles.findIndex((pickle) => pickle.id === id);
        this.setState({
            hasWrittenToday: false,
            currentPickle: pickles[editAt],
            editMode: true
        })
    }

    removePickle = (id) => {
        const pickles = this.state.pickles;
        const deleteAt = pickles.findIndex((pickle) => pickle.id === id);
        const newPicklesList = pickles.filter((pickle, i) => i !== deleteAt);
        this.setState({
            pickles: newPicklesList,
            currentPickle: newPicklesList.length === 0 ? null : newPicklesList[Math.floor(Math.random() * newPicklesList.length)]
        });
    }

    refreshCurrentPickle = () => {
        let randomPickle = this.state.currentPickle;
        // Avoids randomizing if there is only one pickle
        if (this.state.pickles.length > 1) {
            while (randomPickle.id === this.state.currentPickle.id) {
                randomPickle = this.state.pickles[Math.floor(Math.random() * this.state.pickles.length)];
            }
        }
        this.setState({
            currentPickle: randomPickle
        });
    }

    handleSubmit = (pickle) => {
        let newPicklesList = this.state.pickles;

        if (this.state.editMode) {
            pickle.id = this.state.currentPickle.id;
            // Add new version of pickle
            newPicklesList = [...this.state.pickles, pickle];
            // Delete old version of pickle
            const deleteAt = this.state.pickles.findIndex(deletePickle => deletePickle.id === pickle.id);
            newPicklesList = newPicklesList.filter((pickle, i) => i !== deleteAt);
        } else {
            // Assigns unique id to new pickle
            pickle.id = this.state.pickles.length === 0 ? 0 : this.state.pickles[this.state.pickles.length - 1].id + 1;
            newPicklesList = [...this.state.pickles, pickle];
        }
        this.setState({
            pickles: newPicklesList,
            currentPickle: newPicklesList[Math.floor(Math.random() * newPicklesList.length)],
            editMode: false,
            hasWrittenToday: true
        });
    }

    render() {
        // Show read or write depending on if user has written a pickle today
        let modeContent = (this.state.hasWrittenToday && this.state.pickles.length > 0) ? 
            <Read pickle={this.state.currentPickle} refreshPickle={this.refreshCurrentPickle} editPickle={this.editPickle} removePickle={this.removePickle} />
            : <Write pickle={this.state.currentPickle} editMode={this.state.editMode} prompts={this.state.prompts} handleSubmit={this.handleSubmit} />;
        return (
            <div>
                <div className="pure-g">
                    <div className="pure-u-1-5" />
                    <div className="pure-u-3-5">
                        <div className="logo">
                            <img
                                src={require('../../img/picklesUp.png')}
                                alt="pickles up"
                            />
                        </div>
                        <div className="content-container">
                            {modeContent}
                        </div>
                    </div>
                    <div className="pure-u-1-5" />
                </div>

                {/* Uncomment for troubleshooting save and delete */}
                {/* <div className="pure-u-1">
                        <div className="pickles-table-container">
                            <PicklesTable
                                pickles={this.state.pickles}
                                removePickle={this.removePickle}
                            />
                        </div>
                    </div> */}
            </div>
        );
    }
}

export default Pickles;