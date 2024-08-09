import http from "./http-common";

const items = () => {
    return http.get(`/items/items`);
};

const addItem = (data, username) => {
    return http.post('/items/item', {data, username}); 
};


const deleteItem = (item_id,username)=>{
    return http.delete('/items/delete',{data:{item_id,username}})
}

const updateItem = (data,item_id,username)=>{
    return http.put('/items/update',{data:{data,item_id,username}});
}

const ItemService = {
    items,
    addItem,
    deleteItem,
    updateItem
};

export default ItemService;
