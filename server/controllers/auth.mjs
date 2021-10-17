
import connect from 'getstream';
import bcrypt from 'bcrypt';

import StreamChat from 'stream-chat';

import crypto from 'crypto';

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
    try {
        const {fullName, username, password, phoneNumber} = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, api_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const serverClient = connect(api_key, api_secret, api_id);

        const client = StreamChat.getInstance(api_key, api_secret);

        const {user} = await client.queryUsers({name: username});

        if(!users.length) return res.status(400).json({message: 'User not found'});

        const success = await bcrypt.compare(password, users[0].hashedPasswords);

        const token = serverClient.createUserToken(users[0].id);

        if(success) res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id});
        else res.status(500).json({message: error});

    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
};



export {login, signup};