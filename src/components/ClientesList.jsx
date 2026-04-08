import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/clientes';

function ClientesList({ onEdit }) {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    async function cargarClientes() {
        try {
            setCargando(true);
            setError(null);
            const data = await getClientes();
            setClientes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarClientes();
    }, []);

    async function handleDelete(id) {
        if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
        try {
            await deleteCliente(id);
            await cargarClientes();
        } catch (err) {
            alert('Error al eliminar: ' + err.message);
        }
    }

    if (cargando) return <p>Cargando clientes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de clientes</h2>
            {clientes.length === 0 ? (
                <p>No hay clientes registrados.</p>
            ) : (
                <table border="1" cellPadding="4">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre}</td>
                                <td>{u.correo}</td>
                                <td>{u.telefono}</td>
                                <td>
                                    <button onClick={() => onEdit(u)}>Editar</button>
                                    <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={cargarClientes}>Recargar</button>
        </div>
    );
}

export default ClientesList;