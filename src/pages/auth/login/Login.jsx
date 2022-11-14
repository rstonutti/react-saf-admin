import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { fetchSinToken } from "../../../helpers/fetch";
import { useForm } from "../../../hooks/useForm";
import "./login.scss";

export const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [formValues, handleInputChange] = useForm({
    correo: "",
    password: "",
  });

  const { correo, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);

    const resp = await fetchSinToken("api/v1/auth/login", formValues, "POST");
    const body = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch({
        type: "LOGIN",
        payload: body.usuario,
      });

      console.log("correcto");
    } else {
      console.log(body.msg);
    }
  };

  return (
    <div className="container-login">
      <div className="left">left</div>
      <div className="right">
        {/* DESDE ACA MIRAR LOS ESTILOS */}
        <div className="p-4 bg-white shadow p-3 mb-5 bg-body rounded-3 w-auto auth">
          <h3 className="mb-3 fw-bold text-center">Bienvenido</h3>

          <form value="info" onSubmit={handleSubmit} className="text-center">
            <div className="text-center">
              <input
                className="form-control my-2"
                name="correo"
                type="text"
                placeholder="correo"
                value={correo}
                onChange={handleInputChange}
              />
              <span className="error"> </span>
            </div>
            <div className="text-center">
              <input
                className="form-control my-2"
                name="password"
                type="password"
                placeholder="contraseña"
                value={password}
                onChange={handleInputChange}
              />
              <span className="error"> </span>
            </div>
            <button className="btn btn-primary m-2" type="submit">
              Ingresar
            </button>
            <div className="mt-1"></div>
          </form>
        </div>
      </div>
    </div>
  );
};
