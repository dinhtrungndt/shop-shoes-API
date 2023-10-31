const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const discount = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    name: { type: String, required: true },
    kind: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports =
  mongoose.models.discount || mongoose.model("discount", discount);
