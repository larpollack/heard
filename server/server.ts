import express from "express";
import { PrismaClient } from "@prisma/client";
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create a new transaction
app.post("/transaction", async (req, res) => {
	const transaction = await prisma.transaction.create({
		data: req.body,
	});
	res.json(transaction);
});

// Get all transactions
app.get("/transactions", async (req, res) => {
	const transactions = await prisma.transaction.findMany();
	res.json(transactions);
});

app.get("/highest-transactions", async (req, res) => {
	const transactions = await prisma.transaction.findMany()
	transactions.sort((a,b) => (a.amount - b.amount)) 
	return res.json(transactions[0])
}) 

// app.get("/balances", async (req, res) => {
// 	const transactions = await prisma.transaction.findMany()
// 	const balanceAmt = new Map()
// 	balanceAmt.set(transactions.map((data)=>data.fromAccountId), transactions.map((data)=>data.amount)) 
// 	transactions.map((data)=> data.)
// 	return res.json(transactions[0])
// }) 

// Get a single transaction by id
app.get("/transaction/:id", async (req, res) => {
	const transaction = await prisma.transaction.findUnique({
		where: { id: Number(req.params.id) },
	});
	res.json(transaction);
});


//transactions.amount.sort (a,b) => (a, - b) return transactions[0]
// Update a transaction by id
app.put("/transaction/:id", async (req, res) => {
	const transaction = await prisma.transaction.update({
		where: { id: Number(req.params.id) },
		data: req.body,
	});
	res.json(transaction);
});

// Delete a transaction by id
app.delete("/transaction/:id", async (req, res) => {
	const transaction = await prisma.transaction.delete({
		where: { id: Number(req.params.id) },
	});
	res.json(transaction);
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
