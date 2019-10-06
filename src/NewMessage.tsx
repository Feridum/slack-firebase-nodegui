import {
    View,
    Text,
    LineEdit,
    Button,
} from "@nodegui/react-nodegui";
import React, {FC, useState} from "react";
import {QLineEditEvents, QPushButtonEvents} from "@nodegui/nodegui";

interface NewMessageProps {
    addMessage: (value: string)=>void;
}

export const NewMessage:FC<NewMessageProps> = ({addMessage}) => {
    const [message, setMessage] = useState();

    const lineEditHandler = {
            [QLineEditEvents.returnPressed]: ()=>{
                addMessage(message);
                setMessage('');
            },
            [QLineEditEvents.textChanged]: setMessage
    };

    const buttonHandler = {
        [QPushButtonEvents.pressed]: ()=>{
            addMessage(message);
            setMessage('');
        }
    }


    return (
        <View style={LineEditContainer}>
            <Text>Wpisz: </Text>
            <LineEdit
                on={lineEditHandler}
                id="textField"
                text={message}
                placeholderText="Type new message"
                style={LineEditStyle}
            />
            <Button text="Wyślij" on={buttonHandler}/>
        </View>
    );
};

const LineEditContainer = `
    display: 'flex';
    flex-direction: 'row';
    height: '100%';
    align-items: 'center';
    align-content: 'center';
    margin-left: 10px;
    margin-right: 10px;
`
const LineEditStyle= `
    flex:1;
    margin-left: 3px;
    margin-right: 3px;
`