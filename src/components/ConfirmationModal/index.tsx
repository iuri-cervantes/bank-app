import React from 'react';
import { Modal } from 'react-native';
import TextInput from '../TextInput';
import * as S from './styles';
import theme from '../../styles';
import { useTheme } from '../../hooks/useTheme';

interface ConfirmationModalProps {
    isModalVisible: boolean;
    email: string;
    setEmail: (email: string) => void;
    setIsModalVisible: (visible: boolean) => void;
    handleExecuteAction: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isModalVisible,
    email,
    setEmail,
    setIsModalVisible,
    handleExecuteAction,
}) => {
    const { currentTheme } = useTheme();

    return (
        <Modal transparent animationType="slide" visible={isModalVisible}>
            <S.FullScreenModal>
                <S.ModalView>
                    <S.Header>
                        <S.TitleText>Reenvio de e-mail</S.TitleText>
                    </S.Header>
                    <S.ModalContent>
                        <TextInput
                            label="REENVIAR E-MAIL PARA:"
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Insira seu e-mail"
                            placeholderTextColor={
                                theme[currentTheme || 'dark'].colors.placeholder
                            }
                            onChangeText={(text: string) => setEmail(text)}
                            returnKeyType="done"
                        />
                    </S.ModalContent>
                    <S.ButtonContainer>
                        <S.ButtonSubmit onPress={handleExecuteAction}>
                            <S.BtnText>Reenviar</S.BtnText>
                        </S.ButtonSubmit>
                        <S.ButtonCancel onPress={() => setIsModalVisible(false)}>
                            <S.BtnText cancel>Fechar</S.BtnText>
                        </S.ButtonCancel>
                    </S.ButtonContainer>
                </S.ModalView>
            </S.FullScreenModal>
        </Modal>
    );
};

export default ConfirmationModal;