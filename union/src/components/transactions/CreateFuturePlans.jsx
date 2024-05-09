import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAccountService } from "../../services/index";
const CreateTransactionForm = () => {
  const { userData, token } = useContext(AuthContext);
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await getAccountService({
          user_id: userData.userId,
          token: token,
        });
        setAccountData(data[0].cc_num);
        console.log(data[0].cc_num);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAccountData();
  }, [userData]);
};

export default CreateTransactionForm;
