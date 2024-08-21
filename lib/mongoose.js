// import mongoose from "mongoose";

// export async function mongooseconnect() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI;
//     return mongoose.connect(uri); // No deprecated options here
//   }
// }

import mongoose from "mongoose";

const mongooseconnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export { mongooseconnect };
