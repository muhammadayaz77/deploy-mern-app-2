import mongoose from "mongoose";

let mongoDB = () => {
  mongoose.connect(process.env.MONGO_CONN)
.then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.log("Error Occured : ",err);

})
}
export default mongoDB;