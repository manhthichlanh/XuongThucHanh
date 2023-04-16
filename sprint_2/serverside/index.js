const exp = require("express");
const morgan = require("morgan");
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = exp();

var bodyParser = require('body-parser');

const UserModel = require("./models/users");

const BookModel =  require("./models/books");

const CartModel = require("./models/carts");

const OrderModel = require("./models/orders");
const { json } = require("body-parser");
//cors
app.use(cors());

const corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));
//cors
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan("combined"))

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Xin chàoffff")
});
app.get("/register",(req,res)=>{
    UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});
app.get("/carts",async (req,res,next)=>{
  try {
    const { userId, flag } = req.query;
    // const cartsData = await CartModel.find({});
    // res.json(cartsData);
    const carts = await CartModel.findOne({
      userId,
      flag
    }).sort({ cartId: 'desc' });

    res.json(carts)
  } catch (err) {
    next(err);
  }
});
async function getList() {
  const cart = await CartModel.find({cartId: 7}).populate("userId");
  console.log(cart);
}
getList()
app.post('/add-cart', async (req, res, next) => {
  try {
    const { userId, book, flag } = req.body;

      const lastcart = await CartModel.findOne({}).sort({ cartId: 'desc' });

      const newCartId = lastcart ? lastcart.cartId + 1 : 1;

      const newCart = new CartModel({  cartId: newCartId, userId, book, flag });

      const savedCart = await newCart.save();

      res.status(200).json(savedCart);

  } catch (err) {
    next(err);
  }
});
app.get("/orders",async (req,res,next)=>{
  try {
    const ordersData = await OrderModel.find({});
    res.json(ordersData);
  } catch (err) {
    next(err);
  }
});
const item = {
  id: 1,
  list: [
    { list1:"123" },
    { list2:"321" }
  ]
}
console.log(JSON.stringify(
  item
))
app.post('/add-order', async (req, res, next) => {
  try {

    const lastOrder = await OrderModel.findOne({}).sort({ orderId: 'desc' });

    const newOrderId = lastOrder ? lastOrder.orderId + 1 : 1;

    const now = new Date();

    const total = req.body.price * req.body.quanlity;

    const newOrder = new OrderModel({ ...req.body, orderId: newOrderId, orderDate:now, total: total})
    
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);


    
  } catch (err) {
    next(err);
  }
});

app.get("/books",async (req,res,next)=>{
    try {
      const booksData = await  BookModel.find({});
      res.json(booksData);
    } catch (err) {
      next(err);
    }
});

app.post('/add-book', async (req, res, next) => {
  try {

    const lastBook = await BookModel.findOne({}).sort({ bookId: 'desc' });

    const newBookId = lastBook  ? lastBook .bookId + 1 : 1;

    const newBook = new BookModel({ ...req.body, bookId: newBookId})
    
    const savedBook = await newBook.save();

    res.status(200).json(savedBook);

    // const savedBook = await BookModel.save();

    
  } catch (err) {
    next(err);
  }
});

app.post('/register', async (req, res, next) => {
    try {
      const existingUser = await UserModel.findOne({ username: req.body.username });
      if (existingUser) {
        return res.json({ message: 'Username already exists' });
      }
  
      const lastUser = await UserModel.findOne({}).sort({ userId: 'desc' });
      const newUserId = lastUser ? lastUser.userId + 1 : 1;
  
      const newUser = new UserModel({ ...req.body, userId: newUserId });
  
      const savedUser = await newUser.save();
  
      res.status(201).json( { message: 'Register in successfully', savedUser} );
    } catch (err) {
      next(err);
    }
  });

app.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.json({ message: 'Invalid username or password' });
        }

        const passwordMatch = password === user.password?true:false;

        if (!passwordMatch) {
            return res.json({ message: 'Password is not match' });
        }

        res.status(201).json({ message: 'Logged in successfully', user });
    } catch (err) {
        next(err);
    }
});






app.listen(port,()=>{
    console.log(`Cổng hiện tại là: ${port}`)
});