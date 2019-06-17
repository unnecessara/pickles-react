import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';
import Write from '../Write/Write';
import Read from '../Read/Read';
// import PicklesTable from '../PicklesTable/PicklesTable'
import './Pickles.css';

function Pickles() {
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
        'I lost',
        'Someone once told me ',
        'One time I ',
        'Last night I dreamt ',
        'A special place ',
        'The expression on her face ',
        'Nice things I want to hear ',
        'My mom never ',
        "This is why I'm not like that ",
        'If all else fails ',
        'In another life I ',
        'I never knew about ',
        'I miss this from my previous self ',
        'I wish I was less ',
        'I should try to be more ',
        'When it gets dark, I feel ',
        'One thing I want to do in the next season ',
        'One thing I did that was great this season',
        'Next year I want to do this better ',
        'I really like ',
        "I'm seriously bothered by ",
        'When I feel lonely ',
        "I'm not like my dad. I'm ",
        'I like the taste of ',
        'I like the smell of ',
        "I don't miss "
    ];

    const today = new Date();
    const date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(today);
    const todayPickleExists = picklesList.find(
        pickle => pickle.timestamp === date
    );

    const [pickles, setPickles] = useState(picklesList);
    const [prompts, setPrompts] = useState(promptsList);
    const [currentPickle, setCurrentPickle] = useState(
        picklesList[Math.floor(Math.random() * picklesList.length)]
    );
    const [editMode, setEditMode] = useState(false);
    const [hasWrittenToday, setHasWrittenToday] = useState(todayPickleExists);

    const editPickle = id => {
        const editAt = pickles.findIndex(pickle => pickle.id === id);

        setHasWrittenToday(false);
        setCurrentPickle(pickles[editAt]);
        setEditMode(true);
    };

    const removePickle = id => {
        const deleteAt = pickles.findIndex(pickle => pickle.id === id);
        const newPicklesList = pickles.filter((pickle, i) => i !== deleteAt);
        setPickles(newPicklesList);
        setCurrentPickle(
            newPicklesList.length === 0
                ? null
                : newPicklesList[
                      Math.floor(Math.random() * newPicklesList.length)
                  ]
        );
    };

    const refreshCurrentPickle = () => {
        let randomPickle = currentPickle;
        // Avoids randomizing if there is only one pickle
        if (pickles.length > 1) {
            while (randomPickle.id === currentPickle.id) {
                randomPickle =
                    pickles[Math.floor(Math.random() * pickles.length)];
            }
        }
        setCurrentPickle(randomPickle);
    };

    const handleSubmit = pickle => {
        let newPicklesList = [...pickles];

        if (editMode) {
            pickle.id = currentPickle.id;
            // Add new version of pickle
            newPicklesList.push(pickle);
            // Delete old version of pickle
            const deleteAt = pickles.findIndex(
                deletePickle => deletePickle.id === pickle.id
            );
            newPicklesList = newPicklesList.filter(
                (pickle, i) => i !== deleteAt
            );
        } else {
            // Assigns unique id to new pickle
            pickle.id =
                pickles.length === 0 ? 0 : pickles[pickles.length - 1].id + 1;
            newPicklesList.push(pickle);
        }
        setPickles(newPicklesList);
        setCurrentPickle(
            newPicklesList[Math.floor(Math.random() * newPicklesList.length)]
        );
        setEditMode(false);
        setHasWrittenToday(true);
    };

    return (
        <div>
            <Row className="justify-content-md-center">
                <div className="logo">
                    <img
                        src={require('../../img/picklesUp.png')}
                        alt="pickles up"
                    />
                </div>
            </Row>
            <Row className="justify-content-md-center">
                {// Show read or write depending on if user has written a pickle today
                hasWrittenToday && pickles.length > 0 ? (
                    <Read
                        pickle={currentPickle}
                        refreshPickle={refreshCurrentPickle}
                        editPickle={editPickle}
                        removePickle={removePickle}
                    />
                ) : (
                    <Write
                        pickle={currentPickle}
                        editMode={editMode}
                        prompts={prompts}
                        handleSubmit={handleSubmit}
                    />
                )}
            </Row>

            {/* Uncomment for troubleshooting save and delete */}
            {/* <Row>
                    <div className="pickles-table-container">
                        <PicklesTable
                            pickles={this.state.pickles}
                            removePickle={this.removePickle}
                        />
                    </div>
                </Row> */}
        </div>
    );
}

export default Pickles;
