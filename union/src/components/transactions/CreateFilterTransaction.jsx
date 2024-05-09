import React, { useState, useEffect, useContext } from "react";
import {
  getAccountService,
  getExpensesByCategoryAndAccountService,
  getIncomesByCategoryAndAccountService,
} from "../../services/index";
import { AuthContext } from "../../context/AuthContext";

const CreateFilterTransaction = () => {
  const [totalIncomes, setTotalIncomes] = useState(null);
  const [error, setError] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const { userData, token } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("expenses");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountService({
          user_id: userData.userId,
          token: token,
        });
        setAccountData(data[0].cc_num);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAccountData();
  }, [userData, token]);

  const handleFilterTransactions = async () => {
    try {
      let result = [];
      if (transactionType === "expenses") {
        result = await getExpensesByCategoryAndAccountService({
          cc_num: accountData,
          category,
          token,
        });
      } else if (transactionType === "incomes") {
        result = await getIncomesByCategoryAndAccountService({
          cc_num: accountData,
          category,
          token,
        });
      }
      setTransactions(result);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Filter Transaction</h2>
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="entertainment">entertainment</option>
          <option value="food_dining">food_dining</option>
          <option value="salary">salary</option>
          <option value="gas_transport">gas_transport</option>
          <option value="grocery_net">grocery_net</option>
          <option value="grocery_pos">grocery_pos</option>
          <option value="health_fitness">health_fitness</option>
          <option value="home">home</option>
          <option value="kids_pets">kids_pets</option>
          <option value="misc_net">misc_net</option>
          <option value="misc_pos">misc_pos</option>
          <option value="personal_care">personal_care</option>
          <option value="shopping_net">shopping_net</option>
          <option value="shopping_pos">shopping_pos</option>
          <option value="travel">travel</option>
        </select>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="expenses">Expenses</option>
          <option value="incomes">Incomes</option>
        </select>
        <button onClick={handleFilterTransactions}>Filter Transactions</button>
      </div>
      {accountData && (
        <div>
          <p>Account: {accountData}</p>
        </div>
      )}
      {transactions.length > 0 && (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.category} - {transaction.amount}
            </li>
          ))}
        </ul>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateFilterTransaction;
