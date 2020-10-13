const mongoose = require("mongoose");

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((db) => console.log("DB is connect"))
    .catch((err) => console.log(err));
}
