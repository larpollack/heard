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

// Get a single transaction by id
app.get("/transaction/:id", async (req, res) => {
	const transaction = await prisma.transaction.findUnique({
		where: { id: Number(req.params.id) },
	});
	res.json(transaction);
});

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
