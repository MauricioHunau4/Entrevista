'use client'
import styles from './page.module.css'
import { useState } from 'react'
import TableAlumnos from '../components/table'
import { button_modal } from '@/constants'


export default function Home() {
  const [eliminado, setEliminado] = useState({
    id: -1,
    name: '',
    lastname: '',
  })

  const [alumnos, setAlumnos] = useState(JSON.parse(localStorage.getItem('alumnos')) || [])
  const [alumno, setAlumno] = useState({
    id: alumnos.length + 1,
    name: '',
    lastname: '',
    age: '',
    gender: 'Masculino'
  })

  const submitForm = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('id', alumnos.length + 1)
    const value = Object.fromEntries(data.entries())
    const newAlumnos = [...alumnos, value]
    setAlumnos(newAlumnos)
    localStorage.setItem('alumnos', JSON.stringify(newAlumnos))
    setAlumno({
      id: alumnos.length + 1,
      name: '',
      lastname: '',
      age: '',
      gender: 'Masculino'
    })
  }

  const levantarModal = (id, nombre, apellido) => {
    setEliminado(prevState => ({ ...prevState, id: id, name: nombre, lastname: apellido }))
  }

  const eliminarAlumno = (id) => {
    const newAlumnos = alumnos.filter(alumno => alumno.id !== id);
    setAlumnos(newAlumnos);
    localStorage.setItem('alumnos', JSON.stringify(newAlumnos));
    setEliminado({
      id: -1,
      name: '',
      lastname: '',
    });
  };

  const cerrarModal = () => {
    setEliminado({
      id: -1,
      name: '',
      lastname: '',
    });
  }

  return (
    <main className={styles.main}>
      {eliminado.id != -1 && <div className={styles.background_modal}>
        <div className={styles.modal}>
          <h3>¿Esta seguro que quiere eliminar a {eliminado.name} {eliminado.lastname}? </h3>
          <div style={button_modal}>
            <button className={styles.submit} onClick={() => cerrarModal()}>Cancelar</button>
            <button className={styles.submit} onClick={() => eliminarAlumno(eliminado.id)}>Confirmar</button>
          </div>
        </div>
      </div>}
      <form className={styles.form} onSubmit={submitForm} >
        <h1>
          Ingresar alumnos
        </h1>
        <div className={styles.form_content}>
          <div className={styles.inside_content}>
            <label htmlFor='name'>Nombre</label>
            <input value={alumno.name} className={styles.input} autoCapitalize='on' autoComplete='off' type='text' name='name' onChange={(e) => setAlumno(prevState => ({ ...prevState, name: e.target.value }))}></input>
          </div>
          <div className={styles.inside_content}>
            <label htmlFor='lastname'>Apellido</label>
            <input value={alumno.lastname} className={styles.input} autoCapitalize='on' autoComplete='off' type='text' name='lastname' onChange={(e) => setAlumno(prevState => ({ ...prevState, lastname: e.target.value }))}></input>
          </div>
          <div className={styles.inside_content}>
            <label htmlFor='age'>Edad</label>
            <input value={alumno.age} className={styles.input} autoCapitalize='on' autoComplete='off' type='text' name='age' onChange={(e) => setAlumno(prevState => ({ ...prevState, age: e.target.value }))}></input>
          </div>
          <div className={styles.inside_content}>
            <label htmlFor="gender">Género</label>
            <select className={styles.input} title='genre' name='gender' value={alumno.gender} onChange={(e) => setAlumno(prevState => ({ ...prevState, gender: e.target.value }))}>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          {alumno.gender == 'Otro' && (
            <div className={styles.inside_content}>
              <input className={styles.inside_content_otro} placeholder='Genero...' autoCapitalize='on' autoComplete='off' type='text'></input>
            </div>)
          }
        </div>
        <button type='submit' className={styles.submit}>Agregar</button>
      </form>
      <div className={styles.table} >
        <TableAlumnos alumnos={alumnos} levantarModal={levantarModal} />
      </div>
    </main>
  )
}
