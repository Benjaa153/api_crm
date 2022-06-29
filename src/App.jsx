import { BrowserRouter as Router, Routes as Rutas, Route as Ruta } from "react-router-dom";
import Layout from "./layout/Layout";
import Inicio from "./pages/Inicio";
import NuevoCliente from "./pages/NuevoCliente";
import EditarClientes from "./pages/EditarClientes";
import VerClientes from "./pages/VerClientes";
function App() {

  return (
    <Router>
      <Rutas>

        <Ruta path="/clientes" element={<Layout />}>
          <Ruta index element={<Inicio />} />
          <Ruta path="nuevo" element={<NuevoCliente />} />
          <Ruta path="editar/:id" element={<EditarClientes />} />
          <Ruta path=":id" element={<VerClientes />} />
        </Ruta>

      </Rutas>
    </Router>
  )
}

export default App
