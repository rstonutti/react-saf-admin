import { useReducer } from "react";
import { authReducer } from "./reducers/authReducer";
import { AppRouter } from "./router/AppRouter";
import { AuthContext } from "./contexts/authContext";
import "./App.css";

const init = () => ({
  checking: true,
  /* return JSON.parse(localStorage.getItem('token')) || { logged: false }; */
});

function App() {
  const [state, dispatch] = useReducer(authReducer, {}, init);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
