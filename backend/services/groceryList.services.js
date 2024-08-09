const  { query } = require ("../database/db")


const getItems = async (username) => {
    try {
        const userQuery = `SELECT id FROM users WHERE username = ?`;
        const userRows = await query(userQuery, [username]);

        if (!userRows || !userRows.length) {
            throw new Error('User not found');
        }

        const user_id = userRows[0].id; // Ensure 'id' matches your database field

        const itemsQuery = 'SELECT * FROM grocerylist WHERE id = ?';
        const items = await query(itemsQuery, [user_id]);

        if (!Array.isArray(items)) {
            throw new Error('Items is not an array');
        }

        return { items };
    } catch (error) {
        throw new Error(error.message || 'Error fetching items');
    }
};


const addItem = async(data,username)=>{

    
    const {name,category,quantity} = data;
    try {

        const userQuery = 'SELECT id FROM users WHERE username = ?';
        const userRows = await query(userQuery, [username]);

        if (!userRows || !userRows.length) {
            throw new Error('User not found');
        }

        const user_id = userRows[0].id; // Ensure 'id' matches your database field

        const sql = (`INSERT INTO grocerylist  (name,category,quantity,id) VALUES (?,?,?,?)`)
// aa fekra hon na2es username w ne5od id 
        const result = await  query(sql,[name,category,quantity,user_id]);

        return { success: true , result: result};

    }catch(error){
        return { success: false, message: 'Error adding item' };
    }

}

const deleteItem = async (item_id, username) => {
    try {
        const userQuery = 'SELECT id FROM users WHERE username = ?';
        const userRows = await query(userQuery, [username]);

        if (!userRows || !userRows.length) {
            throw new Error('User not found');
        }

        const user_id = userRows[0].id; // Ensure 'id' matches your database field

        const sql = 'DELETE FROM grocerylist WHERE item_id = ? AND id = ?';
        const result = await query(sql, [item_id, user_id]);

        return result.affectedRows > 0; // Ensure that a row was actually deleted
    } catch (error) {
        console.error('Error in deleteItem:', error);
        throw new Error(error.message);
    }
};


const updateItem = async (data)=>{

    try {

        const {name, category, quantity, item_id, username} = data;

        const userQuery = 'SELECT id FROM users WHERE username = ?';
        const userRows = await query(userQuery, [username]);

        if (!userRows || !userRows.length) {
            throw new Error('User not found');
        }

        const user_id = userRows[0].id; 


        const updateSql = `UPDATE grocerylist SET name = ? , category = ? , quantity = ?  WHERE  item_id = ? AND  id = ?`;

        const result = await query(updateSql,[name, category, quantity,item_id,user_id]);

        return true;

    }catch(error){
        throw new Error(error)
    }
}

module.exports  = {getItems, addItem, deleteItem, updateItem}