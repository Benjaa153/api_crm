import { useState, useEffect } from 'react'
import Clientes from '../Components/Cliente'
const Inicio = () => {

    const [clientes, setClientes] = useState([])
    useEffect(() => {
        const obtenerClienteAPI = async () => {

            try {
                const url = 'http://localhost:4000/clientes'
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setClientes(resultado)// cargamos en el estado toda la respuesta del get
            } catch (error) {
                console.log(error);
            }
        }
        obtenerClienteAPI()
    }, [])

    const handleEliminar = async id => {
        const confirmar = confirm('Deseas eliminar este cliente?')
        if (confirmar) {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                })
                await respuesta.json()
                const arrayClientes = clientes.filter(cliente => cliente.id !== id)

                setClientes(arrayClientes)
            }
            catch (error) {

            }
        }
    }
    return (
        <div>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>

                </thead>

                <tbody>
                    {clientes.map(cliente => (
                        <Clientes
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                    {/* cuando se pone () se da por implicito el return  */}
                </tbody>
            </table>
        </div>
    )
}

export default Inicio