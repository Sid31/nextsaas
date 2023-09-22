import { useUser } from "../../context/user";
import { useEffect } from "react";
const Login = () => {
    const { login } = useUser();
  
    useEffect(login, []);
  
    return <p>Logging in</p>;
  };

export default Login;