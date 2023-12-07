import { acciones, button } from '@/constants';
import Link from 'next/link';
import React from 'react';


const Table = ({ alumnos, levantarModal }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody className='tbody'>
                {alumnos.length === 0 && (
                    <tr style={{ textAlign: 'center' }}>
                        <td colSpan='5' style={{ lineHeight: '2.5' }}>No hay alumnos</td>
                    </tr>
                )}
                {alumnos.map((alumno, index) => (
                    <tr style={{ textAlign: 'center' }} key={index}>
                        <td>{alumno.name}</td>
                        <td>{alumno.lastname}</td>
                        <td>{alumno.age}</td>
                        <td>{alumno.gender}</td>
                        <td>
                            <div style={acciones}>
                                <Link href={`/editar/${alumno.id}`} style={button} as={button}>Editar</Link>
                                <button style={button} onClick={() => levantarModal(alumno.id, alumno.name, alumno.lastname)} className='button'>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    );
};

export default Table;
