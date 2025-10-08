import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import Loading from '../../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import formaterToken from '../../../utils/formaterToken';
import useFetch from '../../../hooks/useFetch';

const API_URL = import.meta.env.VITE_API_URL

const Dashboard = () => {
  const [modalidades, setModalidades] = useState([]);
  const {request, loading} = useFetch()

  useEffect(() => {
    async function fetchData() {
      const token = formaterToken()
      const decode = jwtDecode(token)
     if(token){
       const responseModalidades = await request(`${API_URL}modalidade/get-modalidades`, {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({profId: decode.profId})
          })
          setModalidades(responseModalidades.json)
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
