import { db } from "../db";
import { NextRequest, NextResponse } from "next/server";

const Transaction = db.Transaction;

export async function POST( req: NextRequest) {
    const {userId} = await req.json();
}