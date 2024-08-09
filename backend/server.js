const express = require('express');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorhandler');
const itemRoutes = require('./routes/groceryList.routes')
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/items',itemRoutes)

app.use(errorHandler);

const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));