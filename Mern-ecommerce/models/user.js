const mongoose = require("mongoose");
//To hash password
const crypto = require("crypto");
//For unique strings
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 30,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  {timestamps: true},
);

//virtual field

// userSchema
//   .virtual("password")
//   .set(password => {
//     this._password = password;
//     this.salt = uuidv1();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(() => {
//     return this._password;
//   });

userSchema
  .virtual("password")
  .set(password => {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });


//methods

userSchema.method("encryptPassword",function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "Invalid password";
    }
  },
);


// userSchema.methods = {
//   encryptPassword: password => {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (error) {
//       return "";
//     }
//   },
// };

module.exports = mongoose.model("User", userSchema);
