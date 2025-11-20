import styled from 'styled-components';
import backgroundImage from '../../assets/LOGO_VETORIZADA_COM_FUNDO_BRANCO_800x275.png';

export const Container = styled.div`
  height: 88vh;

  background-color: rgba(0,0,0, .9);
  background-image: url(${backgroundImage});
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 96%;
`