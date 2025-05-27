import styled, { css } from 'styled-components/native';



export const MainContainer = styled.View`
${({ theme }) => css`
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
backgroundColor: ${theme.colors.btnColor};
`}
`;

export const Button = styled.TouchableOpacity`
    backgroundColor: #a60;
    margin-bottom: 50px;
`;
