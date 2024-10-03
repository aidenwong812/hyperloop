import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
  Transaction: transactionModel(),
};

// mongoose models with schema definitions

function transactionModel() {
  const schema = new Schema(
    {
      useId: { type: String, required: true },
      payoutAddress: { type: String, required: true },
      fromCurrency: { type: String, required: true },
      toCurrensy: { type: String, required: true },
      amount: { type: String, required: true },
      directedAmount: { type: String, required: true }
    },
    {
      timestamps: true,
    }
  );
  // const transaction = mongoose.model("transaction", schema);
  // module.exports = transaction;
  return mongoose.models.Transaction || mongoose.model("Transaction", schema);
}
