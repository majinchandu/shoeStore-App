const express = require('express')
var mongoose = require('mongoose');
const Products = require('./ProductSchema');
const User = require('./UserSchema');
var mongoDB = 'mongodb+srv://GOFOOD:chauhan20@cluster0.vyzojrl.mongodb.net/shoesStore';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const app = express()
const port = 5000
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(express.json());
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
var nodemailer = require('nodemailer');
// const Razorpay = require("razorpay");

const cors = require("cors")//npm package to remove cors error
app.use(cors())//middleware to resolve cors issue

const Jwt = require('jsonwebtoken');
const { useParams } = require('react-router-dom');
const Reviews = require('./ReviewSchema');
const Cart = require('./CartSchema');
// const { default: Cart } = require('../shoestore/src/frontend/components/Product/Cart');
const jwtKey = 'dtuadminoffice'

app.get('/productList', async (req, res) => {
    let products = await Products.find();
    if (products.length > 0) { // agar employees table empty nhi hai to chalao
        res.send(products); // employees list send kardo
    } else { // agar employees table empty hai
        res.send("no products found"); //ye message bhejdo 
    }
})

app.get('/reviewList/:id', async (req, res) => {
    let reviews = await Reviews.find({ product: req.params.id });
    if (reviews.length > 0) {
        // res.json(reviews);
        res.send(reviews)
    }
    else {
        res.send("no reviews  for this product ")
    }
})


app.post('/register', async function (req, res) {
    try {
        const check = await User.findOne({ email: req.body.email }).exec();
        //In this example, findOne() returns a Query object, and exec() is called to execute the query and return a promise that resolves to the result of the query. By using await before exec(), you ensure that the code waits for the query to complete before moving on to the next steps.
        if (!check) {
            let user = new User(req.body);
            let result = await user.save();
            result = result.toObject();
            delete result.password;
            console.log(req.body);
            res.send(result);
            console.log("Received data:", req.body);
        } else {
            res.send({ message: "User already exists" });
        }
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


app.get('/userList', async (req, res) => {

    let user = await User.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
    if (user.length > 0) { // agar employees table empty nhi hai to chalao
        res.send(user); // employees list send kardo
    } else { // agar employees table empty hai
        res.send("no user found"); //ye message bhejdo 
    }
})



app.post('/loginUser', async function (req, res) {
    console.log(req.body);// jo input aaya hai usko dikhao
    if (req.body.password && req.body.email) { // agar input me email aur password aayi hai tabhi hi chale warna na chale 
        let exisUser = await User.findOne(req.body).select("-password") //dekho ki existing user hai ki nhi aur usme se password hatadoo 
        console.log(exisUser);

        if (exisUser) {
            Jwt.sign({ exisUser }, jwtKey, (err, token) => {
                if (err) {
                    res.send("Something went wrong")
                }
                res.send({ exisUser, auth: token })
            })
        } else {
            res.send({ result: "No User found" })
        }

    } else {// email ya password me se koi ek cheez ya dono nhi daale
        res.send("Result not found")
    }

})


app.post('/addReview', async function (req, res) {
    try {
        let review = new Reviews(req.body);
        review.Date = new Date();
        let result = await review.save();
        result = result.toObject();
        console.log(req.body);
        res.send(result);
        console.log("Received data:", req.body);
    } catch (error) {
        console.error("Error in adding review:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get('/product/:id', async (req, res) => {

    let result8 = await Products.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
    if (result8) { // agar product mila to chalao
        console.log(result8);
        res.send(result8)
    } else { // agar user nhi mila to chalao
        res.send("no result found")
    }
})

app.get('/user/:id', async (req, res) => {

    let result8 = await User.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
    if (result8) { // agar product mila to chalao
        console.log(result8);
        res.send(result8)
    } else { // agar user nhi mila to chalao
        res.send("no result found")
    }
})

app.get('/cart/:productId/:userId', async (req, res) => {

    let result8 = await Products.findOne({ _id: req.params.productId })// getting the product by comparing its id given in parameters with any id in the collection
    let result9 = await User.findOne({ _id: req.params.userId })
    if (result8 && result9) { // agar product mila to chalao
        console.log(result8);
        console.log(result9);
        res.send({ result8, result9 })
        // res.send(result9);
    } else { // agar user nhi mila to chalao
        res.send("no result found")
    }
})

app.get('/userCart/:id', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.id });
        if (cart) {
            res.send(cart);
        } else {
            res.send({});
        }
    } catch (error) {
        res.status(500).send("Error retrieving user cart: " + error.message);
    }
});



app.delete('/cartProduct/:userId/:productId', async function (req, res) {
    try {

        // const result7 = await Cart.updateOne({ userId: req.params.userId }, { $pull: { productIds: req.params.productId } });
        // { userId: req.params.userId }  This is the filter criteria. It specifies which document(s) to update
        //  productIds: req.params.productId :: This is the update operation. , pull is used to remove an element from an array 
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId: userId });
        const productIds = cart.productIds;
        productIds.delete(req.params.productId);
        cart.productIds = productIds
        await cart.save();
        res.send(cart.productIds);
    } catch (error) {
        res.send("error in deleting the product from cart" + error);
    }
});




app.patch('/cartProduct/:userId/:productId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

        // Check if the user already has the product in the cart
        const cart = await Cart.findOne({ userId: userId });

        if (cart && cart.productIds.has(productId)) {
            return res.send("Product already exists in the user's cart");
        }

        // If the product is not in the cart, add it
        const updateProduct = await Cart.findOneAndUpdate(
            { userId: userId },
            { $inc: { [`productIds.${productId}`]: 1 } }, // Using $inc to increment the quantity of productId
            { new: true, upsert: true }
        );

        res.send(updateProduct);
    } catch (error) {
        res.status(500).send("Can't add product to cart due to this error - " + error);
    }
});


// User Address Update or create new address

app.put('/userAddress/:id', async function (req, res) { // put methd is used to update a function
    let result10 = await User.updateOne(
        { _id: req.params.id },// jiske basis pe update karani hai
        { $set: req.body }// jo update karani hai (ratlo)
    )
    console.log(result10);
    res.send(result10) // ye karna zaruri hai put function ke saath 
});

// app.get('/findQuantity/:userId/:productId', async (req, res) => {
//     try {
//         let cart = await Cart.findOne({ userId: req.params.userId , productIds:req.params.productId });
//         if (cart) {
//             res.send(cart);
//         } else {
//             res.send({});
//         }
//     } catch (error) {
//         res.status(500).send("Error retrieving user cart: " + error.message);
//     }
// })
app.get('/findQuantity/:userId/:productId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            // Check if the productIds object exists and contains the productId
            if (cart.productIds && cart.productIds[req.params.productId]) {
                // If the productId exists in the productIds object, return the quantity
                res.send({ quantity: cart.productIds[req.params.productId] });
            } else {
                // If the productId doesn't exist in the productIds object, return 0 quantity
                res.send({ quantity: 0 });
            }
        } else {
            // If the cart doesn't exist, return an empty object
            res.send({});
        }
    } catch (error) {
        res.status(500).send("Error retrieving user cart: " + error.message);
    }
});

// app.patch('/updateQuantities/:userId/:productId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const productId = req.params.productId;
//         const pruduct = await Cart.findOne({ userId: userId,productIds.first :productId });
//         // const productIds = Object.keys(cartProducts);

//         const updateProduct = await Cart.findOneAndUpdate(
//             { userId: userId },
//             { $set: req.body }
//         );


//     } catch (error) {

//     }
// });
app.patch('/updateQuantities/:userId/:productId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        console.log(typeof (productId))
        console.log(productId);
        console.log(userId);

        const cart = await Cart.findOne({ userId: userId });

        if (cart) {

            const productIds = cart.productIds;
            // productIds is a map
            console.log(productIds);

            if (productIds.has(productId)) {

                productIds.set(productId, req.body.quantity) // setting key vlue pairs in javascript 
                // Update the cart document with the modified productIds
                const updatedCart = await Cart.findOneAndUpdate(
                    { userId: userId },
                    { $set: { productIds: productIds } },
                    { new: true } // Return the updated document
                );

                res.send(updatedCart); // Send the updated cart document as response
            } else {
                res.status(404).send("Product not found in the cart.");
            }
        } else {
            res.status(404).send("Cart not found for the user.");
        }
    } catch (error) {
        res.status(500).send("Error updating quantities: " + error.message);
    }
});

// PAYMENT

const Razorpay = require('./Razorpay');
const crypto = require('crypto');
const Order = require('./OrderSchema');
// const { default: Category } = require('../shoestore/src/frontend/components/Product/Category');

app.post('/createOrder', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    try {
        const order = await Razorpay.orders.create({ amount, currency, receipt });
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send({ error: 'Error creating order', details: error.message });
    }
});

app.post('/verifyPayment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', 'xSJDUggdmw288sUGqkt3unAK');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.json({ status: 'success' });
    } else {
        res.json({ status: 'failure' });
    }
});

// orders 
app.get('/orderList', async (req, res) => {
    let orders = await Order.find();
    if (orders.length > 0) { // agar employees table empty nhi hai to chalao
        res.send(orders); // employees list send kardo
    } else { // agar employees table empty hai
        res.send("no orders found"); //ye message bhejdo 
    }
})



app.post('/place-order/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Create a new order using cart data
        const newOrder = new Order({
            userId: cart.userId,
            productIds: cart.productIds,
            Date: new Date()
        });

        // Save the new order
        await newOrder.save();

        // Optionally, clear the cart
        // await Cart.findOneAndUpdate({ userId }, { productIds: new Map() });
        await Cart.deleteOne({ userId });
        res.status(201).json({ message: 'Order placed successfully', order: newOrder })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/userOrder/:id', async (req, res) => {
    try {
        let order = await Order.find({ userId: req.params.id });
        if (order) {
            res.send(order);
        } else {
            res.send({});
        }
    } catch (error) {
        res.status(500).send("Error retrieving user cart: " + error.message);
    }
});



app.post('/update/userId/', async function (req, res) {

    const userId = req.params.userId;
    const productId = req.params.productId;

    // let review = new Reviews(req.body);
    // let result = await review.save();
    // result = result.toObject();
    // console.log(req.body);
    // res.send(result);
    // console.log("Received data:", req.body);

    try {
        // const updateProduct = await Cart.findOneAndUpdate(
        //     { userId: userId },
        //     { $inc: { [`productIds.${productId}`]: 1 } }, // Using $inc to increment the quantity of productId
        //     { new: true, upsert: true }
        // );
        let order = new Order(req.body);
        let result = await order.save();
        result = result.toObject();
        console.log(req.body);
        console.log(result);
        res.send(result);

        // res.send(updateProduct);
    } catch (error) {
        res.send("error occured ", error);
    }

    // const { name, description } = req.body;
    // res.send(`Name ${name}, desc ${description}`);
});



// app.patch('/cartProduct/:userId/:productId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const productId = req.params.productId;

//         // Check if the user already has the product in the cart
//         const cart = await Cart.findOne({ userId: userId });

//         if (cart && cart.productIds.has(productId)) {
//             return res.send("Product already exists in the user's cart");
//         }

//         // If the product is not in the cart, add it
//         const updateProduct = await Cart.findOneAndUpdate(
//             { userId: userId },
//             { $inc: { [`productIds.${productId}`]: 1 } }, // Using $inc to increment the quantity of productId
//             { new: true, upsert: true }
//         );

//         res.send(updateProduct);
//     } catch (error) {
//         res.status(500).send("Can't add product to cart due to this error - " + error);
//     }
// });

// SEND EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chanderveersinghchauhan08@gmail.com',
        pass: 'ppae dugp dgbt nask'
    }
});

app.post('/send-email', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'chanderveersinghchauhan08@gmail.com',
        to: email,
        subject: 'Here are some tips about Shoes , you need to keep in mind while purchasing one ',
        text: "When selecting shoes, it's essential to consider both comfort and functionality to ensure a good fit and long-lasting wear. Start by knowing your correct shoe size, including width, as improper sizing can lead to discomfort and foot problems. Look for shoes with good arch support and cushioning, which are crucial for maintaining foot health, especially if you'll be wearing them for extended periods or engaging in physical activities. The shoe material is also important; breathable fabrics like leather or mesh help keep your feet cool and dry. Additionally, consider the type of activity you'll be doing—running shoes, for instance, offer different support and traction compared to dress shoes. It's also wise to try on shoes later in the day when your feet are more likely to be swollen, ensuring a more accurate fit. Finally, never compromise on quality for the sake of style; well-made shoes are an investment in your foot health and overall comfort."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email', error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

// search functionality 
// app.get('/search/:key', async (req, res) => {
//     let result12 = await Products.find({
//         "$or": [
//             { name: { $regex: req.params.key } },// name ko search karne ke liye
//             // { company: { $regex: req.params.key } }, // company ko search karne ke liye
//             // { category: { $regex: req.params.key } } // category ko search karne ke liye
//         ]
//     });
//     if(result12)
//         res.send(result12);
//     else res.send("no product found")
// })
// app.get('/search/:key', async (req, res) => {
//     let result12 = await Products.find({
//         "$or": [
//             { name: { $regex: req.params.key } },// name ko search karne ke liye
//             // { company: { $regex: req.params.key } }, // company ko search karne ke liye
//             // { category: { $regex: req.params.key } } // category ko search karne ke liye
//         ]
//     });
//     if(result12)
//         res.send(result12);
//     else res.send("no product found")
// })
app.get('/search/:key', async (req, res) => {
    try {
        // Debugging: Log the search key
        console.log("Search key:", req.params.key);

        // Perform the search with case-insensitive regex
        let result12 = await Products.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { category: { $regex: req.params.key, $options: 'i' } },
                { Title: { $regex: req.params.key, $options: 'i' } }
            ]
        });


        // Check if results are found and send appropriate response
        if (result12.length > 0) {
            res.send(result12);
        } else {
            res.status(404).json({ message: "No product found" });
        }
    } catch (error) {
        // Debugging: Log any errors that occur
        console.error("Error during search:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/categoryList/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        let products = await Products.find({ category: categoryId });
        if (products.length > 0) { // agar employees table empty nhi hai to chalao
            res.send(products); // employees list send kardo
        } else { // agar employees table empty hai
            res.send("no products found"); //ye message bhejdo 
        }
    } catch (error) {
        console.log("error occured", error);
    }

})

// update rating on home page 

// app.patch('/updateRatings/:id',async  (req, res) => {
//     try {
//         const productId = req.params.id;
//         let product = await Products.find({ _id: productId });
//         const {avgRating} = req.body;
//         product.rating = avgRating;
//         let result  = product.save();
//     } catch (error) {
//         console.log("error occured " , error);
//     }
// });
app.patch('/updateRatings/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { avgRating } = req.body;

        // Find the product by its ID
        let product = await Products.findById(productId);
        
        // Check if product exists
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        // Update the rating
        product.rating = avgRating;

        // Save the updated product
        let result = await product.save();

        // Send the updated product as a response
        res.send(result);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});





app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))