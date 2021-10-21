import React, {useState} from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import dotenv from 'dotenv';
import {ChannelListContainer, ChannelContainer, Auth} from './components'


import 'stream-chat-react/dist/css/index.css';
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

    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState('');
    const [isEditing, setIsEditing] = useState('');

    if(!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    isEditing={isEditing}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    )
}

export default App
