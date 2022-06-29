import Formulario from '../Components/Formulario'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const EditarClientes = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()
  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`

        const respuesta = await fetch(url)

        const resultado = await respuesta.json()

        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        setCargando(!cargando)
      }, 3000);
    }
    obtenerClienteAPI()
  }, [])
  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar datos de un cliente</p>

      {cliente?.nombre ? (
        <Formulario
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p className="text-black-900 uppercase text-3xl border-b p-20 ">No existe el cliente solicitado</p>}
    </div>
  )
}

export default EditarClientes