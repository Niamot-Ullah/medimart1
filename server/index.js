require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//middleware
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const database = client.db("MediMart");
  const productCollection = database.collection("products");
  const categoryCollection = database.collection("categories");
  const ordersCollection = database.collection("orders");
  const usersCollection = database.collection("users");
  try {
    // Get all categories 
    app.get("/categories", async (req, res) => {
      const result = await categoryCollection.find({}).toArray();
      res.send(result);
    });
    //get category based products by name
    app.get("/category-product/:name", async (req, res) => {
      const name = req.params.name;
      // console.log(name); 
      const result = await productCollection.find({category: name}).toArray();
      // console.log(result);
      res.send(result);
    });
    // Get all products/medicine for shop
    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });
    // Get a single products/medicine for details
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    //get user role
    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) return res.status(404).send({ message: "user not found" });
      res.send({ role: result?.role });
    });
    //get all user for admin
    app.get("/all-users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    //update user role
    app.patch("/user/role/update/:email", async (req, res) => {
      const email = req.params.email;
      const { role } = req.body;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          role,
          status: "verified",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    //request user role
    app.patch("/become-seller/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          status: "requested",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //get data for admin statistics
    app.get("/admin-statistics", async (req, res) => {
      const totalUser = await usersCollection.estimatedDocumentCount();
      const totalProduct = await productCollection.estimatedDocumentCount();
      const totalOrders = await ordersCollection.estimatedDocumentCount();
      //mongodb aggregation
      const result = await ordersCollection
        .aggregate([
          {
            $addFields: {
              createdAt: { $toDate: "$_id" },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                },
              },
              revenue: { $sum: "$price" },
              order: { $sum: 1 },
            },
          },
        ])
        .toArray();

      const chartData = result.map((data) => ({
        date: data._id,
        totalRevenue: data.revenue,
        order: data.order,
      }));
      const totalRevenue = result.reduce((sum, data) => sum + data?.revenue, 0);
      res.send({
        chartData,
        totalUser,
        totalProduct,
        totalOrders,
        totalRevenue,
      });
    });

    // Add a new product/medicine
    app.post("/add-product", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });
    // create payment intent for order
    app.post("/create-payment-intent", async (req, res) => {
      const { medicineId, quantity } = req.body;
      const product = await productCollection.findOne({
        _id: new ObjectId(medicineId),
      });
      if (!product)
        return res.status(404).send({ message: "Product not found" });
      const totalPrice = quantity * product?.price * 100;
      //  stripe ...
      const { client_secret } = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: client_secret });
    });

    //save order data in db
    app.post("/order", async (req, res) => {
      const orderData = req.body;
      const result = await ordersCollection.insertOne(orderData);
      res.send(result);
    });

    // get order info for users
    app.get("/orders/user/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { "customer.email": email };
      const result = await ordersCollection.find(filter).toArray();
      res.send(result);
    });
    // get order info for users
    app.get("/orders/seller/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { "seller.email": email };
      const result = await productCollection.find(filter).toArray();
      res.send(result);
    });

    // update medicine quantity (increase or decrease)
    app.patch("/update-quantity/:id", async (req, res) => {
      const id = req.params.id;
      const { quantityToUpdate, status } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $inc: {
          quantity:
            status === "increase" ? quantityToUpdate : -quantityToUpdate,
        },
      };
      const result = await productCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // delete a product
    app.delete('/product/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await productCollection.deleteOne(query);
      res.send(result); 
    })

    
    //update product 
    app.put('/update-product/:id', async(req,res)=>{
      const id = req.params.id;
      const productData = req.body;
      const query = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set: productData
      }
      const result = await productCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    //save or update a users info in db
    app.post("/user", async (req, res) => {
      const userData = req.body;
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();
      const query = { email: userData?.email };
      const alreadyExists = await usersCollection.findOne(query);
      if (!!alreadyExists) {
        const result = await usersCollection.updateOne(query, {
          $set: { last_loggedIn: new Date().toISOString() },
        });
        return res.send(result);
      }
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to MediMart Server");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
