import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";

interface TransactionFormProps {
	transactionId?: string;
	onTransactionComplete?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = (
	props: TransactionFormProps
) => {
	const { transactionId } = props;
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState(0);
	const [transactionDate, setTransactionDate] = useState(new Date());

	useEffect(() => {
		if (transactionId) {
			axios
				.get(`http://localhost:3001/transaction/${transactionId}`)
				.then((response) => {
					const transaction = response.data;
					setTitle(transaction.title);
					setDescription(transaction.description);
					setAmount(transaction.amount);
					setTransactionDate(new Date(transaction.transactionDate));
				});
		}
	}, [transactionId]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const transaction = {
			title,
			description,
			amount,
			transactionDate,
		};

		if (transactionId) {
			axios
				.put(`http://localhost:3001/transaction/${transactionId}`, transaction)
				.then((response) => console.log(response));
			props.onTransactionComplete && props.onTransactionComplete();
		} else {
			axios
				.post("http://localhost:3001/transaction", transaction)
				.then((response) => console.log(response));
			props.onTransactionComplete && props.onTransactionComplete();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className="flex flex-col my-2">
				Title:
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="p-2 border rounded-md"
				/>
			</label>
			<label className="flex flex-col my-2">
				Description:
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="p-2 border rounded-md"
				/>
			</label>
			<label className="flex flex-col my-2">
				Amount:
				<input
					type="text"
					value={`$${amount}`}
					onChange={(e) => setAmount(parseFloat(e.target.value))}
					className="p-2 border rounded-md"
				/>
			</label>
			<label className="flex flex-col my-2">
				Transaction Date:
				<input
					type="date"
					value={transactionDate.toISOString().split("T")[0]}
					onChange={(e) => setTransactionDate(new Date(e.target.value))}
					className="p-2 border rounded-md"
				/>
			</label>
			<Button type="submit" variant="submit" className="mt-10">
				Submit
			</Button>
		</form>
	);
};

export default TransactionForm;
