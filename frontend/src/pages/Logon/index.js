import React, { useState } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';

import './styles.css';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Logon() {
    const [ong_id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/session', { ong_id });

            localStorage.setItem('ongId', ong_id);
            localStorage.setItem('ongName', response.data.ong.name);

            history.push('/profile');

        } catch(error) {
            alert('Crenciais de logon não identificadas')
        }

    }

    return (
    <div className="logon-container">
        <section className="form">
            <img src={ logoImg } alt="Be The Hero"/>
            <form onSubmit={ handleLogin }>
                <h1>Faça seu logon</h1>

                <input type="text" className="text" 
                    placeholder="Sua ID" 
                    value = { ong_id } 
                    onChange = { e => setId(e.target.value) }
                />
                <button className="button" type="submit">Entrar</button>

                <Link to="/register" className="back-link">
                    <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={ heroesImg } alt="Heroes"/>
    </div>
    );
}