import React, { useState, useEffect } from "react";
import {
  getTransactionsByAccountService,
  getTransactionByIdService,
  listTransactionsByCategoryService,
  getExpensesByAccountService,
  getIncomesByAccountService,
  getTotalExpensesByAccountService,
  getTotalIncomesByAccountService,
  getExpensesByCategoryAndAccountService,
  getIncomesByCategoryAndAccountService,
  listTransactionsByDateRangeAndAccountService,
} from "../../services/index";

const TransactionFilterPage = () => {
  const [ccNum, setCcNum] = useState("");
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  const handleFilterByAccount = async () => {
    try {
      const accountTransactions = await getTransactionsByAccountService({
        cc_num: ccNum,
      });
      setTransactions(accountTransactions);
    } catch (error) {
      console.error("Error filtering transactions by account:", error.message);
    }
  };

  const handleFilterById = async () => {
    try {
      const transaction = await getTransactionByIdService({ id });
      setTransactions([transaction]);
    } catch (error) {
      console.error("Error filtering transaction by ID:", error.message);
    }
  };

  const handleFilterByCategory = async () => {
    try {
      const categoryTransactions = await listTransactionsByCategoryService({
        category,
      });
      setTransactions(categoryTransactions);
    } catch (error) {
      console.error("Error filtering transactions by category:", error.message);
    }
  };

  const handleFilterByDateRange = async () => {
    try {
      const dateRangeTransactions =
        await listTransactionsByDateRangeAndAccountService({
          startDate,
          endDate,
          cc_num: ccNum,
        });
      setTransactions(dateRangeTransactions);
    } catch (error) {
      console.error(
        "Error filtering transactions by date range:",
        error.message
      );
    }
  };

  const handleFilterExpenses = async () => {
    try {
      const expensesData = await getExpensesByAccountService({ cc_num: ccNum });
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }
  };

  const handleFilterIncomes = async () => {
    try {
      const incomesData = await getIncomesByAccountService({ cc_num: ccNum });
      setIncomes(incomesData);
    } catch (error) {
      console.error("Error fetching incomes:", error.message);
    }
  };

  const handleFilterTotalExpenses = async () => {
    try {
      const totalExpensesData = await getTotalExpensesByAccountService({
        cc_num: ccNum,
      });
      setTotalExpenses(totalExpensesData.total);
    } catch (error) {
      console.error("Error fetching total expenses:", error.message);
    }
  };

  const handleFilterTotalIncomes = async () => {
    try {
      const totalIncomesData = await getTotalIncomesByAccountService({
        cc_num: ccNum,
      });
      setTotalIncomes(totalIncomesData.total);
    } catch (error) {
      console.error("Error fetching total incomes:", error.message);
    }
  };

  const handleFilterExpensesByCategory = async () => {
    try {
      const categoryExpenses = await getExpensesByCategoryAndAccountService({
        cc_num: ccNum,
        category,
      });
      setExpenses(categoryExpenses);
    } catch (error) {
      console.error("Error fetching expenses by category:", error.message);
    }
  };

  const handleFilterIncomesByCategory = async () => {
    try {
      const categoryIncomes = await getIncomesByCategoryAndAccountService({
        cc_num: ccNum,
        category,
      });
      setIncomes(categoryIncomes);
    } catch (error) {
      console.error("Error fetching incomes by category:", error.message);
    }
  };

  return (
    <div>
      <h1>Transaction Filter</h1>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          value={ccNum}
          onChange={(e) => setCcNum(e.target.value)}
        />
        <button onClick={handleFilterByAccount}>Filter</button>
      </div>
      <div>
        <label>Transaction ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={handleFilterById}>Filter</button>
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleFilterByCategory}>Filter</button>
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilterByDateRange}>Filter</button>
      </div>
      <div>
        <button onClick={handleFilterExpenses}>Get Expenses</button>
        <button onClick={handleFilterIncomes}>Get Incomes</button>
        <button onClick={handleFilterTotalExpenses}>Get Total Expenses</button>
        <button onClick={handleFilterTotalIncomes}>Get Total Incomes</button>
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleFilterExpensesByCategory}>
          Filter Expenses
        </button>
        <button onClick={handleFilterIncomesByCategory}>Filter Incomes</button>
      </div>
      <div>
        <h2>Transactions:</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {/* Mostrar detalles de la transacción */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Expenses:</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>{/* Mostrar detalles del gasto */}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Incomes:</h2>
        <ul>
          {incomes.map((income) => (
            <li key={income.id}>{/* Mostrar detalles del ingreso */}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Total Expenses: ${totalExpenses}</h2>
        <h2>Total Incomes: ${totalIncomes}</h2>
      </div>
    </div>
  );
};

export default TransactionFilterPage;
