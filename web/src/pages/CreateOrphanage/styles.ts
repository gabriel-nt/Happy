import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`;

export const Form = styled.form`
  margin: 85px auto;
  margin-bottom: 20px;
  width: 95%;
  background: #ffffff;

  border: 1px solid #d3e2e5;
  border-radius: 20px;
  padding: 20px;

  overflow: hidden;

  .leaflet-container {
    margin-bottom: 40px;
    border-radius: 20px;
    border: 1px solid #d3e2e5;
  }

  fieldset {
    border: 0;

    legend {
      width: 100%;
      font-size: 20px;
      line-height: 34px;
      color: #5c8599;
      font-weight: 700;

      border-bottom: 1px solid #d3e2e5;
      margin-bottom: 40px;
      padding-bottom: 24px;
    }
  }

  fieldset + fieldset {
    margin-top: 80px;
  }

  .input-block + .input-block {
    margin-top: 24px;
  }

  .input-block {
    input,
    textarea {
      width: 100%;
      background: #f5f8fa;
      border: 1px solid #d3e2e5;
      border-radius: 20px;
      outline: none;
      color: #5c8599;
    }

    input {
      height: 64px;
      padding: 0 16px;
    }

    input[type='file'] {
      display: none;
    }

    textarea {
      min-height: 120px;
      max-height: 240px;
      resize: vertical;
      padding: 16px;
      line-height: 28px;
    }

    label {
      display: flex;
      color: #8fa7b3;
      margin-bottom: 8px;
      line-height: 24px;

      span {
        font-size: 14px;
        color: #8fa7b3;
        margin-left: 24px;
        line-height: 24px;
      }
    }

    .images-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 16px;

      .image {
        position: relative;

        svg {
          position: absolute;
          top: 0;
          cursor: pointer;
          right: 0;
          padding: 5px;
          width: 36px;
          height: 36px;
          background: #ffffff;
          border: 1px solid #d3e2e5;
          box-sizing: border-box;
          border-radius: 0px 20px;
        }
      }

      img {
        width: 100%;
        height: 96px;
        object-fit: cover;
        border-radius: 20px;
      }
    }

    .new-image {
      height: 75px;
      min-width: 70px;
      background: #f5f8fa;
      border: 1px dashed #96d2f0;
      border-radius: 20px;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (min-width: 992px) {
    width: 700px;
    margin: 64px auto;
    padding: 64px 80px;

    fieldset {
      legend {
        font-size: 32px;
      }
    }

    .input-block {
      .images-container {
        grid-template-columns: repeat(5, 1fr);
      }
      .new-image {
        width: auto;
        height: 96px;
      }
    }
  }
`;

export const Select = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    height: 64px;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    color: #5c8599;
    cursor: pointer;

    &.active {
      background: #edfff6;
      border: 1px solid #a1e9c5;
      color: #37c77f;
    }
    &:first-child {
      border-radius: 20px 0px 0px 20px;
    }

    &:last-child {
      border-radius: 0 20px 20px 0;
      border-left: 0;
    }
  }
`;

export const Button = styled.button`
  margin-top: 64px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3cdc8c;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36cf82;
  }
`;
