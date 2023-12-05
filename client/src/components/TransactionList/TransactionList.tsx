import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import TransactionForm from "../TransactionForm/TransactionForm";
import Button from "../Button";

interface Transaction {
	id: number;
	title: string;
	description: string;
	amount: string;
	transactionDate: string;
}

const TransactionList: React.FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	const refreshTransactions = () => {
		axios.get("http://localhost:3001/transactions").then((response) => {
			console.log(response.data);
			setTransactions(response.data);
		});
	};

	useEffect(() => {
		refreshTransactions();
	}, []);

	const openModal = (transaction: Transaction | null) => {
		setSelectedTransaction(transaction);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setSelectedTransaction(null);
		setModalIsOpen(false);
	};

	const deleteTransaction = (id: number) => {
		axios.delete(`http://localhost:3001/transaction/${id}`).then(() => {
			setTransactions(
				transactions.filter((transaction) => transaction.id !== id)
			);
		});
	};

	return (
		<div>
			<h1 className="text-lg font-semibold uppercase mt-8">All Transactions</h1>
			<div className="flex flex-row justify-end mx-[15%] my-2 ">
				<Button variant="create" size="small" onClick={() => openModal(null)}>
					Create Transaction
				</Button>
			</div>
			<div className="grid grid-cols-7 justify-center mx-[15%]">
				<h2>ID</h2>
				<h2>Title</h2>
				<h2>Description</h2>
				<h2>Amount</h2>
				<h2>Date</h2>
				<h2>Actions</h2>
			</div>
			{transactions.map((transaction) => (
				<div
					className="grid grid-cols-7 justify-center mx-[15%] my-4 border-b border-stone-400 pb-1"
					key={transaction.id}
				>
					<div>{transaction.id}</div>
					<div>{transaction.title}</div>
					<div>{transaction.description}</div>
					<div>${transaction.amount}</div>
					<div>
						{new Date(transaction.transactionDate).toLocaleDateString()}
					</div>

					<Button
						variant="edit"
						className="mx-3"
						onClick={() => openModal(transaction)}
					>
						Edit
					</Button>
					<Button
						variant="delete"
						className="mx-3"
						onClick={() => deleteTransaction(transaction.id)}
					>
						Delete
					</Button>
				</div>
			))}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				ariaHideApp={false}
			>
				<div className="flex flex-row-reverse">
					<button onClick={closeModal} className="hover:font-bold mb-2 text-lg">
						X
					</button>
				</div>
				<TransactionForm
					transactionId={selectedTransaction?.id.toString()}
					onTransactionComplete={refreshTransactions}
				/>
			</Modal>
		</div>
	);
};

export default TransactionList;
