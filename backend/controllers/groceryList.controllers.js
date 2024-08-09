
const { getItems, addItem, deleteItem, updateItem } = require('../services/groceryList.services')

const getItemsController = async (req, res) => {
    try {

    const username = req.headers.username;
 
        if (!username) {
            return res.status(400).json({ message: 'Username not found in request headers' });
        }

        const items = await getItems(username);
        res.json({ success: true, items });
    } catch (error) {
        console.error('Error fetching items:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const addItemController = async (req,res)=>{


    try {
        const { name, category, quantity } = req.body.data;
        const username = req.body.username
        const result = await addItem({ name, category, quantity},username);


        if (result.success) {
            res.json({ success: true, message: 'Operation successful', data: result.result });
            
        } else {
            res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const deleteController = async (req, res) => {

    try {
        const username= req.body.username;
        const item_id  = req.body.item_id;

        if (!username || !item_id) {
            return res.status(400).json({ message: 'Username or item_id missing' });
        }

        const result = await deleteItem(item_id, username);

        if (result) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateItemController = async (req,res)=>{
    try {

        const { item_id, username } = req.body.data;
        const { name, category, quantity } = req.body.data.data;

        const result = await updateItem( {name, category, quantity, item_id, username});

        if (!result) {
            return res.status(401).json({ message: "Item cannot be updated" });
        }

        res.status(200).json({ message: "Item updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getItemsController,addItemController,deleteController, updateItemController}