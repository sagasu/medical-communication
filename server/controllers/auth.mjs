const login = (req, res) => {
    try {

    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
};

const signup = (req, res) => {
    try {

    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
};

export {login, signup};