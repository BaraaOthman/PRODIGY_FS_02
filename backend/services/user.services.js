const { query } = require("../database/db");

const createUser = async (data, username) => {
  try {
    const { email, password } = data;
    
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
        return { success: false, message: 'Email already in use' };
    }

    await query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error registering user' };
  }
};



const loginUser = async (data) => {
  const { username, password } = data;

  try {
      // SQL query to verify user credentials
      let loginsql = `SELECT * FROM users WHERE username = ? AND password = ?`;

      // Execute the query
      const result = await query(loginsql, [username, password]);

      // If user is found, return success response
      if (result.length) {
          return { status: 200, message: "Successful", user: result[0] };
      } else {
          return { status: 401, message: "Invalid username or password" };
      }
  } catch (error) {
      // Handle database errors
      throw new Error(error);
  }
};



const getUsersService = async (req, res) => {
  try {
    const result = await query('SELECT email, username, password FROM users');
    return result;
} catch (error) {
    throw new Error('Database error');
}
};


const deleteUser = async(username)=>{
  try{

    const existingUser = await query('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0) {
            const result = await query("DELETE FROM users WHERE username = ?", [username]);

            if(result)
            return { message: 'User deleted successfully' };
    }else {
      return { message: `User with username:  ${username} not found` };
    }

  }catch(error){
    throw new Error(error)
  }
}

module.exports = { createUser,loginUser ,getUsersService, deleteUser};
