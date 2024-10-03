import { db } from "../db";
import { NextRequest, NextResponse } from "next/server";

const Transaction = db.Transaction;

export async function POST(req: NextRequest) {
  try {
    const { userId, payoutAddress, fromCurrency, toCurrensy, amount, directedAmount } = await req.json();
    const newTransaction = new Transaction({
      userId: userId,
      payoutAddress: payoutAddress,
      fromCurrency: fromCurrency,
      toCurrensy: toCurrensy,
      amount: amount,
      directedAmount: directedAmount
    })
    newTransaction.save();
    return NextResponse.json(
      { message: "Transaction has been Succesefully." },
      {
        headers: {
          "content-type": "application/json",
        },
        status: 200,
      })
  } catch (err) {
    return NextResponse.json(
      {
        message: "Transaction is failed",
        success: false,
      },

      {
        headers: {
          "content-type": "application/json",
        },
        status: 500,
      }
    );
  }
}