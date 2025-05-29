import styled, { css } from 'styled-components/native';

// Define a interface do tema
interface Theme {
  colors: {
    mainBg: string,
    mainLabelColor: string,
    btnLabel: string,
    infoLabelColor: string,
    btnColor: string,
    loadingIndicator: string,
    inputContainer: string,
    inputText: string,
    placeholder: string,
  };
}

// Define interface do styled props
interface StyledProps {
  theme: Theme;
}

interface TransferStyledProps extends StyledProps {
  isSuccess?: boolean;
  isOutgoing?: boolean;
}

export const MainContainer = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.btnColor}
  `}
`;



export const ContainerInfo = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    border-radius: 20px;
    width: 85%;
    background-color: ${theme.colors.mainBg};
    padding: 70px 30px 20px 30px;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 30px;
  `}
`;

export const ContainerInside = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    border-radius: 20px;
    width: 100%;
    background-color: ${theme.colors.btnColor};
    padding: 15px;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 5px;
    gap: 20px;
  `}
`;

export const SectionWrapper = styled.View<StyledProps>`
  ${({ theme }: StyledProps) => css`
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  `}
`;

export const LoadingIcon = styled.ActivityIndicator<StyledProps>``;

export const InfoText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 16px;
  `}
`;

export const LabelText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 20px;
    font-weight: bold;
  `}
`;

export const FilterText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.loadingIndicator};
    font-size: 16px;
  `}
`;

export const BtnText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.btnLabel};
    font-size: 16px;
  `}
`;



export const TitleText = styled.Text<StyledProps>`
  ${({ theme }: StyledProps) => css`
    color: ${theme.colors.mainLabelColor};
    font-size: 25px;
    font-weight: bold;
  `}
`;

export const ButtonInvisible = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css``}
`;

export const ButtonSubmit = styled.TouchableOpacity<StyledProps>`
  ${({ theme }: StyledProps) => css`
    background-color: ${theme.colors.btnColor};
    padding: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px;
    margin: 20px 0px 40px 0px;
  `}
`;

export const LogOffBtn = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top: 20px;
`;

export const OclusionBtn = styled.TouchableOpacity`
    position: absolute;
    right: 60px;
    top: 20px;
`;

export const FilterBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
`;


export const BtnLine = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;





//componente de listagem
export const TransferItem = styled.View<StyledProps>`
${({ theme }: StyledProps) => css`
    background-color: ${theme.colors.mainBg};
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${theme.colors.btnColor};
`}
`;

export const TransferHeader = styled.View<StyledProps>`
${({ theme }: StyledProps) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`}
`;

export const TransferType = styled.Text<StyledProps>`
${({ theme }: StyledProps) => css`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.colors.mainLabelColor};
`}
`;

export const TransferStatus = styled.Text<TransferStyledProps>`
${({ isSuccess, theme }: TransferStyledProps) => css`
    font-size: 12px;
    color: ${isSuccess ? '#28a745' : '#dc3545'};
    font-weight: 500;
`}
`;

export const TransferDirection = styled.Text<TransferStyledProps>`
${({ isOutgoing, theme }: TransferStyledProps) => css`
    font-size: 16px;
    font-weight: 600;
    color: ${isOutgoing ? '#dc3545' : '#28a745'};
`}
`;

export const TransferAmount = styled.Text<TransferStyledProps>`
${({ isOutgoing, theme }: TransferStyledProps) => css`
    font-size: 16px;
    font-weight: bold;
    color: ${isOutgoing ? '#dc3545' : '#28a745'};
`}
`;

export const TransferDetails = styled.View<StyledProps>`
${({ theme }: StyledProps) => css`
`}
`;

export const DetailText = styled.Text<StyledProps>`
${({ theme }: StyledProps) => css`
    font-size: 14px;
    color: ${theme.colors.mainLabelColor};
    margin-bottom: 2px;
`}
`;

export const TransferDateTime = styled.Text<StyledProps>`
${({ theme }: StyledProps) => css`
    font-size: 12px;
    color: ${theme.colors.mainLabelColor};
    opacity: 0.7;
`}
`;

export const EmptyState = styled.View<StyledProps>`
${({ theme }: StyledProps) => css`
    padding: 32px;
    align-items: center;
`}
`;

export const TransfersList = styled.View<StyledProps>`
${({ theme }: StyledProps) => css`
    max-height: 400px;
    width: 100%;
    margin-top: 10px;
`}
`;

export const Line = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;
