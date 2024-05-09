import { useState, useContext } from "react";
import { createTransactionService } from "../../services/index";
import { AuthContext } from "../../context/AuthContext";

const CreateTransactionForm = () => {
  const { userData, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    cc_num: "",
    merchant: "",
    amount: "",
    category: "",
    date: "",
    time: "",
    expense_income: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        expense_income: formData.expense_income ? 1 : 0,
      };
      const response = await createTransactionService(transactionData, token);
      alert("Transaction created successfully: " + JSON.stringify(response));
      setFormData({
        cc_num: "",
        merchant: "",
        amount: "",
        category: "",
        transaction_date: "",
        transaction_time: "",
        expense_income: 1,
      });
    } catch (error) {
      alert("Failed to create transaction: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Transaction</h2>
      <input
        type="text"
        name="cc_num"
        value={formData.cc_num}
        onChange={handleChange}
        placeholder="Account Number"
        required
      />
      <input
        type="text"
        name="merchant"
        value={formData.merchant}
        onChange={handleChange}
        placeholder="Merchant"
        required
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.transaction_date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.transaction_time}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="expense_income"
          checked={formData.expense_income}
          onChange={handleChange}
        />
        Expense (check if true)
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateTransactionForm;
