import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import dotenv from 'dotenv';
import {ChannelListContainer, ChannelContainer, Auth} from './components'

import './App.css';
dotenv.config();
const apiKey = process.env.REACT_APP_STREAM_KEY;

const cookies = new Cookies();

console.log(apiKey);
const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get('token');

if(authToken){
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken);
}

const App = () => {

    if(!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer/>
                <ChannelContainer/>
            </Chat>
        </div>
    )
}

export default App
