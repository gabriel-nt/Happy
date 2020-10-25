import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  flex-direction: column;

  .leaflet-container {
    z-index: 5;
  }

  .create-orphanages {
    position: absolute;
    z-index: 10;
    right: 40px;
    bottom: 40px;
    width: 48px;
    height: 48px;
    background: #15c3d6;
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    &:hover {
      background: #17d6eb;
    }
  }

  .map-popup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
  }

  .map-popup .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      width: 40px;
      height: 40px;
      background: #15c3d6;
      border-radius: 12px;
      box-shadow: 17.2868px 27.6589 41.4884px rgba(23, 142, 166, 0.16);

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .map-popup .leaflet-popup-content .map-popup .leaflet-popup-tip-container {
    display: none;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    .create-orphanages {
      width: 64px;
      height: 64px;
      border-radius: 20px;
    }
  }
`;

export const Header = styled.aside`
  width: 100%;
  position: relative;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    h2 {
      /* font-size: 40px; */
      font-weight: 800;
      /* line-height: 42px; */
      margin-top: 16px;
      /* margin-top: 64px; */
    }

    p {
      line-height: 28px;
      margin-top: 24px;
    }
  }

  footer {
    position: absolute;
    right: 20px;

    display: flex;
    flex-direction: column;
    line-height: 24px;

    strong {
      font-weight: 800;
    }
  }

  @media (min-width: 768px) {
    padding: 80px;
    width: 440px;

    header {
      h2 {
        font-size: 40px;
        line-height: 42px;
        margin-top: 64px;
      }
    }

    footer {
      position: relative;
    }
  }
`;
