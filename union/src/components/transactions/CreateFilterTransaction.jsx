import React, { useState, useEffect, useContext } from "react";
import {
  getAccountService,
  getExpensesByCategoryAndAccountService,
  getIncomesByCategoryAndAccountService,
} from "../../services/index";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css"; // Importar el archivo CSS con los estilos

const CreateFilterTransaction = () => {
  const [totalIncomes, setTotalIncomes] = useState(null);
  const [error, setError] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const { userData, token } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("expenses");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountService({
          user_id: userData.userId,
          token: token,
        });
        setAccountData(data[0].cc_num);
      } catch (error) {
        setError("No hay datas para los filtros introducidos");
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
      toast.error("No hay datas para los filtros introducidos");
      setError(error.message);
    }
  };

  // Función para calcular el índice del primer y último elemento en la página actual
  const indexOfLastTransaction = currentPage * 10;
  const indexOfFirstTransaction = indexOfLastTransaction - 10;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para generar los botones de la paginación
  const renderPaginationButtons = () => {
    const pageCount = Math.ceil(transactions.length / 10);
    const pagesToShow = 5; // Mostrar cinco botones a la vez
    const currentPageIndex = currentPage - 1; // Índice de la página actual

    // Calcular el rango de páginas a mostrar
    let startPageIndex = currentPageIndex - Math.floor(pagesToShow / 2);
    let endPageIndex = currentPageIndex + Math.floor(pagesToShow / 2);

    // Ajustar el rango si se excede el número total de páginas
    if (startPageIndex < 0) {
      endPageIndex -= startPageIndex; // Reducir el exceso de páginas al inicio
      startPageIndex = 0;
    }
    if (endPageIndex >= pageCount) {
      startPageIndex -= endPageIndex - (pageCount - -1); // Ajustar el inicio para no exceder el total
      endPageIndex = pageCount - -1;
    }

    // Generar los botones de paginación dentro del rango calculado
    const paginationButtons = [];
    for (let i = startPageIndex; i <= endPageIndex; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </button>
      );
    }

    return paginationButtons;
  };

  // Renderizar los botones de paginación
  return (
    <div className="container">
      <ToastContainer />
      <h2>Filter Transaction</h2>
      <div className="filter-section">
        <select
          className="select-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="entertainment">entertainment</option>
          <option value="food_dining">food_dining</option>
          <option value="Salary">salary</option>
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
          className="select-transaction-type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="expenses">Expenses</option>
          <option value="incomes">Incomes</option>
        </select>
        <button
          className="filter-button"
          onClick={() => {
            handleFilterTransactions();
            setCurrentPage(1); // Resetear la página a la primera cuando se filtra
          }}
        >
          Filter Transactions
        </button>
      </div>
      {accountData && (
        <div>
          <p>Account: {accountData}</p>
        </div>
      )}
      {currentTransactions.length > 0 && (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.category}</td>
                <td>{transaction.amount.toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Paginación */}
      <div className="pagination">
        {transactions.length > 0 && (
          <div className="pagination-list">{renderPaginationButtons()}</div>
        )}
      </div>
    </div>
  );
};

export default CreateFilterTransaction;
