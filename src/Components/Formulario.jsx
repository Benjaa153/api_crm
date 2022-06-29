import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta' // componte en el cual esta cargado el mensaje de error 
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    // yup sirve para validar formulario este ya trae sus propias sentencias 
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto') // si el nombre tiene un minimo de 3 digitos que diga que es muy corto
            .max(30, 'El nombre es muy largo') // si el nombre tiene mas de 30 digitos que diga que es muy largo
            .required('El Nombre del Cliente es Obligatorio'), // para decirle que es obligatorio el nombre
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('Email no valido')
            .required('El Email es obligatorio'),

        telefono: Yup.number()
            .positive('Numero no valido')// para que sea siempre > 0
            .integer('Numero no valido') // de tipo entero
            .min(10, 'Numero no valido')
            .typeError('El numero no es valido'),
    })
    const handleSubmit = async (valores) => {
        // try y un catch para captar algun error 
        try {
            let respuesta
            if (cliente.id) {
                const url = `http://localhost:4000/clientes/${cliente.id}` // pasamos el id si es que existe para hacer el metodo put que es para actualizar
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            else {
                // si el id no existe quiere decir que estamos creando un nuevo paciente por ende hacemos el metodo post para agregar
                const url = 'http://localhost:4000/clientes'
                 respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (

            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                {/* utilizamos formik para definir el formulario 
                seguido de Form que remplaza a la etiqueta form
            */}

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? '',

                    }}

                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)

                        resetForm()
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        return (

                            <Form
                                className="mt-10"
                            >
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="nombre"
                                    >
                                        Nombre:
                                    </label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="empresa"
                                    >
                                        Empresa:
                                    </label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Empresa del Cliente"
                                        name="empresa"
                                    />

                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="email"
                                    >
                                        E-mail:
                                    </label>
                                    <Field
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Email del Cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="telefono"
                                    >
                                        Telefono:
                                    </label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-200"
                                        placeholder="Telefono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor="notas"
                                    >
                                        Notas:
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-200 h-40"
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:cursor-pointer"
                                >

                                </input>
                            </Form>
                        )
                    }}
                </Formik>

            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario