import styled from 'styled-components';

import landingImg from '../../images/landing.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px 0;

  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  align-items: center;
  justify-content: center;

  .content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    max-height: 680px;

    display: flex;
    align-items: center;
    flex-direction: column;

    main {
      max-width: 500px;
      margin-top: 30px;
      margin-bottom: 50px;

      text-align: center;

      h1 {
        font-size: 40px;
        line-height: 45px;
        font-weight: 700;
      }

      p {
        font-size: 18px;
        line-height: 34px;
      }

      img {
        max-height: 300px;
        margin-top: 20px;
      }
    }

    .location {
      position: absolute;
      left: 20px;
      bottom: 0;

      font-size: 18px;

      display: flex;
      flex-direction: column;
      text-align: left;

      strong {
        font-weight: 800;
      }
    }

    .enter-app {
      position: absolute;
      bottom: 0;
      right: 20px;

      width: 56px;
      height: 56px;
      background-color: #ffd666;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 30px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #96feff;
      }
    }
  }

  @media (min-width: 1100px) {
    padding: 0;

    .content-wrapper {
      max-width: 1100px;
      align-items: flex-start;
      justify-content: space-between;

      padding: 20px 0;
      background: url(${landingImg}) no-repeat 80% center;

      main {
        padding: 0;
        max-width: 350px;
        text-align: left;

        h1 {
          font-size: 76px;
          font-weight: 900;
          line-height: 70px;
        }

        p {
          margin-top: 40px;
          font-size: 24px;
        }

        img {
          display: none;
        }
      }

      .location {
        right: 0;
        top: 10px;
        font-size: 24px;

        line-height: 34px;
        text-align: right;
      }

      .enter-app {
        right: 0;
        bottom: 10px;

        width: 80px;
        height: 80px;
      }
    }
  }
`;
