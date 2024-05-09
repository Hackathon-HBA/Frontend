import React, { useState, useEffect } from "react";
import {
  getAccountService,
  getTotalIncomesByAccountService,
  getIncomesByAccountService,
  getTotalExpensesByAccountService,
  getExpensesByAccountService,
} from "../../services/index";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TransactionTable = ({ data, currentPage }) => {
  return (
    <table
      style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse",
        textAlign: "left",
      }}
    >
      <thead>
        <tr>
          <th>Transacción</th>
          <th>Número de tarjeta</th>
          <th>Comerciante</th>
          <th>Categoría</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.transaction_id}</td>
            <td>{transaction.cc_num}</td>
            <td>{transaction.merchant}</td>
            <td>{transaction.category}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CreateBalanceTransaction = () => {
  const [accountData, setAccountData] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [expensesAccountData, setExpensesAccountData] = useState(null);
  const [incomesAccountData, setIncomesAccountData] = useState(null);
  const [error, setError] = useState(null);
  const [totalIncomesData, setIncomesData] = useState(null);
  const [totalExpensesData, setExpensesData] = useState(null);
  const [expensesCurrentPage, setExpensesCurrentPage] = useState(1);
  const [incomesCurrentPage, setIncomesCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const { userData, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountService({
          user_id: userData.userId,
          token: token,
        });
        setAccountData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAccountData();
  }, [userData]);

  const handleAccountChange = async (event) => {
    const selectedAccountId = event.target.value;
    setSelectedAccount(selectedAccountId);
    try {
      const expensesData = await getExpensesByAccountService({
        cc_num: selectedAccountId,
        token: token,
      });
      setExpensesAccountData(expensesData);

      const incomesData = await getIncomesByAccountService({
        cc_num: selectedAccountId,
        token: token,
      });
      setIncomesAccountData(incomesData);

      const totalIncomesData = await getTotalExpensesByAccountService({
        cc_num: selectedAccountId,
        token: token,
      });
      setIncomesData(totalIncomesData);

      const totalExpensesData = await getTotalIncomesByAccountService({
        cc_num: selectedAccountId,
        token: token,
      });
      setExpensesData(totalExpensesData);
    } catch (error) {
      setError(error.message);
    }
  };

  const paginateExpenses = (pageNumber) => setExpensesCurrentPage(pageNumber);
  const paginateIncomes = (pageNumber) => setIncomesCurrentPage(pageNumber);

  const indexOfLastTransaction = (currentPage, data) =>
    currentPage * transactionsPerPage;
  const indexOfFirstTransaction = (currentPage, data) =>
    indexOfLastTransaction(currentPage, data) - transactionsPerPage;

  const expensesCurrentData = expensesAccountData
    ? expensesAccountData.slice(
        indexOfFirstTransaction(expensesCurrentPage, expensesAccountData),
        indexOfLastTransaction(expensesCurrentPage, expensesAccountData)
      )
    : [];
  const incomesCurrentData = incomesAccountData
    ? incomesAccountData.slice(
        indexOfFirstTransaction(incomesCurrentPage, incomesAccountData),
        indexOfLastTransaction(incomesCurrentPage, incomesAccountData)
      )
    : [];

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>
      <br></br>
        <label htmlFor="account">Seleccione Cuenta:</label>
        <select
          id="account"
          onChange={handleAccountChange}
          value={selectedAccount}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Account</option>
          {accountData &&
            accountData.map((account) => (
              <option key={account.cc_num} value={account.cc_num}>
                {account.cc_num}
              </option>
            ))}
        </select>
      </div>
      <br></br>
      {totalIncomesData && totalExpensesData && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "20px" }}>
              {totalIncomesData.totalExpenses}
            </div>
            <div
              style={{
                position: "absolute",
                top: "-25px",
                textAlign: "center",
                width: "100%",
                color: "white",
              }}
            >
              Gastos
            </div>
          </div>
          <div
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              backgroundColor: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "20px" }}>
              {totalExpensesData.totalIncomes}
            </div>
            <div
              style={{
                position: "absolute",
                top: "-25px",
                textAlign: "center",
                width: "100%",
                color: "white",
              }}
            >
              Ingresos
            </div>
          </div>
        </div>
      )}
      <br></br>
      {expensesAccountData && (
        <div>
          <h2>Gastos</h2>
          <TransactionTable
            data={expensesCurrentData}
            currentPage={expensesCurrentPage}
          />
          <Pagination
            itemsPerPage={transactionsPerPage}
            totalItems={expensesAccountData.length}
            paginate={paginateExpenses}
            currentPage={expensesCurrentPage}
          />
        </div>
      )}
      <br></br>
      {incomesAccountData && (
        <div>
          <h2>Ingresos</h2>
          <TransactionTable
            data={incomesCurrentData}
            currentPage={incomesCurrentPage}
          />
          <Pagination
            itemsPerPage={transactionsPerPage}
            totalItems={incomesAccountData.length}
            paginate={paginateIncomes}
            currentPage={incomesCurrentPage}
          />
          <br></br>
        </div>
        
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= Math.ceil(totalItems / itemsPerPage)) {
      pageNumbers.push(i);
    }
  }

  return (
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {pageNumbers.map((number) => (
        <li key={number} style={{ marginRight: "5px" }}>
          <button
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CreateBalanceTransaction;
