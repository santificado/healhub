import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-size: ${(props) => props.theme.fontSizes.medium};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

export default Button;
