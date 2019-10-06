import {
    Renderer,
    View,
    Text,
    Window,
    Image,
    useEventHandler,
} from "@nodegui/react-nodegui";
import React, {useEffect, useRef, useState} from "react";
import {Messages} from "./Messages";
import {NewMessage} from "./NewMessage";
import {QMainWindow, QMainWindowEvents} from "@nodegui/nodegui";

import firebase, {Timestamp, USER} from "./firebase";


const App = () => {
    const winRef = useRef<QMainWindow>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [windowSize, setWindowSize] = useState({width: 800, height: 450})

    useEffect(() => {
        if (winRef.current) {
            winRef.current.resize(800, 450);
        }

        firebase.collection('messages').orderBy('createdAt').onSnapshot(docSnap => {
            docSnap.docChanges().forEach(result => {
                    if (result.type === 'added') {
                        setMessages(prev => [...prev, result.doc.data()])
                    }
                }
            )
        });

    }, []);


    const windowHandler = useEventHandler(
        {
            [QMainWindowEvents.Resize]: () => {
                if (winRef && winRef.current) {
                    console.log(winRef.current.size());
                    setWindowSize(winRef.current.size());
                }
            },
        },
        []
    );

    const addNewMessage = (message: string) => {
        firebase.collection('messages').add({
            username: USER,
            message: message,
            createdAt: Timestamp.fromDate(new Date())
        })
    };

    return (
        <Window styleSheet={styleSheet} ref={winRef} on={windowHandler}>
            <View id="container">
                <View id="messages">
                    <Messages messages={messages} windowSize={windowSize}/>
                </View>
                <View id="input">
                    <NewMessage addMessage={addNewMessage}/>
                </View>
            </View>
        </Window>
    );
};

const styleSheet = `
  #container {
    flex: 1;
    min-height: '100%';
    flex-direction: 'column'
  }
  #messages {
    flex: 1;
    flex-direction: column;
    background-color: 'orange'
  }
  #input {
    height: '50px';
  }
`;


Renderer.render(<App/>);
