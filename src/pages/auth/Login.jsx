import "./styles/login.scss";

export const Login = () => {
  return (
    <div className="container">
      <div className="left">left</div>
      <div className="right">
        {/* DESDE ACA MIRAR LOS ESTILOS */}
        <div className="p-4 bg-white shadow p-3 mb-5 bg-body rounded-3 w-auto auth">
          <h3 className="mb-3 fw-bold text-center">Bienvenido</h3>

          <form value="info" className="text-center">
            <div className="text-center">
              <input
                className="form-control my-2"
                type="text"
                placeholder="nombre"

              />
              <span className="error">  </span>
            </div>
            <div className="text-center">
              <input
                className="form-control my-2"
                type="password"
                placeholder="contraseña"
              />
              <span className="error">  </span>
            </div>
            <button
              className="btn btn-primary m-2"
              type="submit"
            >
              Ingresar
            </button>
            <div className="mt-1">
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
