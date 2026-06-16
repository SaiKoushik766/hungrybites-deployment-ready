const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const authrouter = require('./routes/auth.route');
const foodrouter = require('./routes/food.route');
const orderrouter = require('./routes/order.route');
const rewardrouter = require('./routes/reward.route');
const adminrouter = require('./routes/admin.route');
const userrouter = require('./routes/user.route');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173',
    'https://hungrybites-deployment-ready-oot1.vercel.app'
  ],
  
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieparser());
app.use('/auth',authrouter);
app.use('/user',userrouter);
app.use('/food',foodrouter);
app.use('/reward',rewardrouter);
app.use('/order',orderrouter)
app.use('/admin',adminrouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
module.exports = app;