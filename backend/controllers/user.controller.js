
const { updateItem } = require('../services/groceryList.services');
const { createUser, loginUser, getUsersService, deleteUser } = require('../services/user.services');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const result = await createUser({ email, password }, username);

        if (result.success) {
            res.json({ success: true, message: 'Registration successful' });
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const result = await loginUser({ username, password });
        
        if (result.status === 200) {
            res.cookie('username', username, { httpOnly: true }); 
            res.json({ success: true, message: 'Login successful', user: result.user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        
        res.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteUserController = async(req,res)=>{
    try {

        const username = req.cookies.username;

        const deleteResult = await deleteUser(username);

        res.status(200).json({ message: deleteResult.message });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {register,login, getUsers,deleteUserController}