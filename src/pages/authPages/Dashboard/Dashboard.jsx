import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import Loading from '../../../components/Loading/Loading';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

const Dashboard = () => {
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const tokenLocal = localStorage.getItem('token');
        if (tokenLocal) {
          const token = tokenLocal.slice(1, tokenLocal.length - 1);
          const response = await fetch(`${API_URL}modalidade/get-modalidades`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          console.log(json)
          setModalidades(json);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (modalidades) {
    return (
      <section className={styles.container}>
        {modalidades.map((modalidade) => {
          return (
            <Link className={styles.modaliContainer} key={modalidade.id}>
              <h3>{modalidade.name.charAt(0).toUpperCase() + modalidade.name.slice(1)}</h3>
              <p>Total de alunos: <span>{modalidade.alunos.length}</span></p>
            </Link>
          );
        })}
      </section>
    );
  }
  if (modalidades && modalidades.length === 0) {
    return (
      <section className={styles.container}>
        <p>Você ainda não possui modalidades.</p>
      </section>
    );
  }
};

export default Dashboard;

// if(modalidades.length > 0){
//     return(
//       <section className={styles.container}>
//         {/* {
//           modalidades.map((modalidade)=>{
//             <div className={styles.modaliContainer}>
//               <p>{modalidade.name}</p>
//             </div>
//           })
//         } */}
//       </section>
//   )
// }else
