const express = require('express');

const router = express.Router();

const { getItemsController, addItemController, deleteController,updateItemController } = require ("../controllers/groceryList.controllers");

router.get('/items',getItemsController);
router.post('/item', addItemController)
router.delete('/delete',deleteController);
router.put('/update',updateItemController);


module.exports = router

 