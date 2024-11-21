const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://VrushabhJoshi:9Q7xxz1w6m6gGFSo.@cluster0.hl0v5.mongodb.net/gofooodmern?retryWrites=true&w=majority&appName=Cluster0';

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
        if (err) {
            console.error("Error connecting to MongoDB:", err);
            return callback(err, null, null); // Pass error to callback
        }

        console.log("Connected to MongoDB");

        try {
            // Fetch data from 'food_items' collection
            const foodCollection = mongoose.connection.db.collection("food_items");
            const foodCollectionData = await foodCollection.find({}).toArray();
            console.log("foodCollection data:", foodCollectionData);

            // Fetch data from 'Categories' collection
            const categoryCollection = mongoose.connection.db.collection("food_Category");
            const categoryData = await categoryCollection.find({}).toArray();
            console.log("categoryCollection data:", categoryData);

            // Pass data to callback
            callback(null, foodCollectionData, categoryData);
        } catch (error) {
            console.error("Error fetching data:", error);
            callback(error, null, null); // Pass error to callback
        }
    });
};
