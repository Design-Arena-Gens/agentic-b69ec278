"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdAdd, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function IncomePage() {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "income",
      amount: 850,
      category: "Trip",
      description: "Airport to City Center",
      date: "2024-01-15",
    },
    {
      id: 2,
      type: "expense",
      amount: 200,
      category: "Fuel",
      description: "Petrol refill",
      date: "2024-01-15",
    },
    {
      id: 3,
      type: "expense",
      amount: 120,
      category: "Food",
      description: "Lunch",
      date: "2024-01-15",
    },
  ]);

  const incomeCategories = ["Trip", "Delivery", "Package", "Other"];
  const expenseCategories = ["Fuel", "Food", "Maintenance", "Toll", "Parking", "Other"];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netAmount = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now(),
      type: transactionType,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
    setShowAddForm(false);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-light pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <MdArrowBack className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold">Income & Expense</h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white text-green-500 p-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <MdAdd className="text-2xl" />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl text-center">
            <MdTrendingUp className="text-2xl mx-auto mb-1" />
            <p className="text-xs opacity-90">Income</p>
            <p className="text-lg font-bold">₹{totalIncome}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-xl text-center">
            <MdTrendingDown className="text-2xl mx-auto mb-1" />
            <p className="text-xs opacity-90">Expense</p>
            <p className="text-lg font-bold">₹{totalExpense}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-xl text-center">
            <FaRupeeSign className="text-2xl mx-auto mb-1" />
            <p className="text-xs opacity-90">Net</p>
            <p className={`text-lg font-bold ${netAmount >= 0 ? "text-green-200" : "text-red-200"}`}>
              ₹{netAmount}
            </p>
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark mb-4">Add Transaction</h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setTransactionType("income")}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      transactionType === "income"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionType("expense")}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      transactionType === "expense"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Expense
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Select category</option>
                  {(transactionType === "income" ? incomeCategories : expenseCategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description..."
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-dark mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <MdTrendingUp className="text-green-500 text-xl" />
                  ) : (
                    <MdTrendingDown className="text-red-500 text-xl" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-dark">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
