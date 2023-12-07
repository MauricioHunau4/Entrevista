'use client'

import Link from 'next/link';
import styles from '../../page.module.css'
import { useEffect, useState } from "react";

const Editar = () => {
    const [alumnos, setAlumnos] = useState(JSON.parse(localStorage.getItem('alumnos')) || []);
    const [alumno, setAlumno] = useState({ name: '', lastname: '', age: '', gender: '' });
    const [editado, setEditado] = useState(false);
    useEffect(() => {
        const params = window.location.pathname.split('/')[2];
        const alumnoEncontrado = alumnos.find(alumno => Number(alumno.id) === parseInt(params));
        if (alumnoEncontrado) {
            setAlumno(alumnoEncontrado);
        }
    }, []);

    const editarAlumno = (e) => {
        e.preventDefault();
        const params = window.location.pathname.split('/')[2];
        const indexAlumno = alumnos.findIndex(alumno => Number(alumno.id) === parseInt(params));
        setAlumnos(prevState => {
            const newState = [...prevState];
            newState[indexAlumno] = alumno;
            return newState;
        });
        setEditado(true)
    };

    useEffect(() => {
        localStorage.setItem('alumnos', JSON.stringify(alumnos))

    }, [alumnos]);

    return (
        <div className={styles.editar}>
            <Link href='/' className={styles.flecha}><h3 style={{ color: 'black', fontSize: '20px' }}>&#8592;</h3></Link>
            <h1 style={{ textAlign: 'center' }}>Editar Alumno</h1>
            <form className={styles.form_content} onSubmit={(e) => editarAlumno(e)}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input className={styles.input} value={alumno.name || ''} onChange={e => setAlumno({ ...alumno, name: e.target.value })} type="text" id="nombre" />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <input className={styles.input} value={alumno.lastname || ''} onChange={e => setAlumno({ ...alumno, lastname: e.target.value })} type="text" id="apellido" />
                </div>
                <div>
                    <label htmlFor="edad">Edad:</label>
                    <input className={styles.input} value={alumno.age || ''} onChange={e => setAlumno({ ...alumno, age: e.target.value })} type="number" id="edad" />
                </div>
                <div>
                    <label htmlFor="genero">Género:</label>
                    <input className={styles.input} value={alumno.gender || ''} onChange={e => setAlumno({ ...alumno, gender: e.target.value })} type="text" id="genero" />
                </div>
                {editado && <p>Editado con exito</p>}
                <button type='submit' className={styles.submit}>Editar</button>
            </form>
        </div>
    );
};

export default Editar;