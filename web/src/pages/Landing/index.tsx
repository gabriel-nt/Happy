import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container } from './styles';

import logoImg from '../../images/logo.svg';
import landingImg from '../../images/landing.svg';

const Landing: React.FC = () => {
  return (
    <Container>
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>

          <img src={landingImg} alt="Happy" />
        </main>

        <div className="location">
          <strong>Taquara</strong>
          <span>Rio Grande do Sul</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </Container>
  );
};

export default Landing;
