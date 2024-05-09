export const registerUserService = async ({ username, email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Frontend-URL": import.meta.env.VITE_APP_FRONTEND,
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    throw new Error(`The ${error.message}`);
  }
};

export const loginUserService = async ({ email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    console.log(json)

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const activateUserService = async ({ token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/activate-account/${token}`
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.message;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDataUserService = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
      {
        method: "GET",

        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updataUserEmailService = async ({ email, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/email/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Frontend-URL": import.meta.env.VITE_APP_FRONTEND,
          Authorization: token,
        },
        body: JSON.stringify({ email }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updataUserService = async ({ data, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
      {
        method: "PUT",
        body: data,
        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updataUserPasswordService = async ({ password, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/password/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// ========== Accounts ==========
export const createAccountService = async ({ user_id, cc_num }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, cc_num }),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to create account');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAccountService = async ({ user_id, token }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${user_id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch account');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ========== Transactions ==========
export const createTransactionService = async (transactionData, token) => {
  try {
    console.log(transactionData);
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,

      },
      body: JSON.stringify(transactionData),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to create transaction');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTransactionsByAccountService = async ({ cc_num }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions/account/${cc_num}`, {
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch transactions for account');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTransactionByIdService = async ({ id }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions/${id}`, {
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch transaction by ID');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTransactionService = async ({ id, transactionData }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to update transaction');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTransactionService = async ({ id }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions/${id}`, {
      method: 'DELETE',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to delete transaction');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listTransactionsByCategoryService = async ({ category }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions/category/${category}`, {
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch transactions by category');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getExpensesByAccountService = async ({ cc_num, token }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${cc_num}/expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch expenses');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getIncomesByAccountService = async ({ cc_num, token }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${cc_num}/incomes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch incomes');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Gastos
export const getTotalExpensesByAccountService = async ({ cc_num, token}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${cc_num}/expenses/total`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch total expenses');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Ingresos
export const getTotalIncomesByAccountService = async ({ cc_num, token }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${cc_num}/incomes/total`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch total incomes');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getExpensesByCategoryAndAccountService = async ({ cc_num, category }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${cc_num}/expenses/category/${category}`, {
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch expenses by category');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getIncomesByCategoryAndAccountService = async ({ cc_num, category }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/accounts/${cc_num}/incomes/category/${category}`, {
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch incomes by category');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const listTransactionsByDateRangeAndAccountService = async ({ startDate, endDate, cc_num }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/transactions/daterange?startDate=${startDate}&endDate=${endDate}&cc_num=${cc_num}`, {
      method: 'GET',
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Failed to fetch transactions by date range and account');
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};