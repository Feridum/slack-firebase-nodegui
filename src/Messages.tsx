import React, {FC} from "react";
import {ScrollArea, Text, View, Image} from "@nodegui/react-nodegui";
import path from "path";

type Message = { message: string, username: string };
interface MessagesProps {
    messages: Array<Message>;
    windowSize: { height: number, width: number };
}

import imageUrl from "../assets/nodegui.jpg";
import {USER} from "./firebase";

const distImgUrl = path.resolve(__dirname, imageUrl);
const MESSAGE_HEIGHT = 50;

export const Messages: FC<MessagesProps> = ({messages, windowSize}) => {
    return (
        <ScrollArea style={`width:'100%';height:'100%'; flex:1;`}>
            <View
                style={`
                min-width: 0; 
                min-height:0;
                height:${Math.max(MESSAGE_HEIGHT * messages.length, windowSize.height-52)};
                width: ${windowSize.width - 20};
                flex: 1;
              `}
            >
                {messages.map((value, i) => (
                    <View style={messageStyle(value)} key={i}>
                        <Image
                            style={imageStyle}
                            src={distImgUrl}
                        />
                        <View style={messageTextStyle}>
                            <Text>{`<b>${value.username}</b>`}</Text>
                            <Text>{value.message}</Text>
                        </View>

                    </View>
                ))}
            </View>
        </ScrollArea>
    )
};


const messageStyle = (value:Message)=>`
height: '${MESSAGE_HEIGHT}px';
flex-direction: ${value.username === USER ? 'row' : 'row-reverse'};
align-items: 'center';
`;

const messageTextStyle = `
flex-direction: 'column';
margin-left: '20px';
margin-right: '20px';
justify-content: 'space-evenly';
height: '100%';
`;

const imageStyle = `
height: "40px";
width: "40px";
qproperty-alignment: 'AlignHCenter';
`;