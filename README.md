- Para rodar o app:
    - Clonar o repositorio
    - Abrir a pasta do projeto no terminal
    - comando "yarn" para instalar as dependências
    - comando "yarn android" para rodar em um emulador Android
    *obs: no aquivo src/services/api.ts, está a baseURL que aponta para localhost (quando utilizado em emuladores http://10.0.2.2:3000), caso for rodar em outro dispositivo certificar de apontar para o ip correto
- Funcionalidades entregues:
    - APP com 2 temas de cores (claro / escuro)
    - Criação de conta de usuário
    - Login
    - Painel principal (home) com alternância entre as contas do usuário e consulta de saldo
    - Tela de tranferências (O usuário escolhe uma de suas contas e faz uma tranferencia para uma conta de outro usuário)
    - Painel de contas onde o usuário tem informações das suas contas (Agência, número, ultimas transações, etc)
    - Tela de extrato, onde o usuário tem acesso à todas as tranferências enviadas/recebidas por cada uma de suas contas
      - A lista de extrato conta com diversos filtros (valores minimo e maximo, tipo da tranferencia e datas)
            *obs: é possivel fazer a filtragem de datas selecionando apenas data de inicio ou data de inicio e fim.
- Endpoints utilizados:
    - '/auth/sign_in' - put
    - '/auth/sign_up' put 
    - '/users/bank_accounts/my' - get
    - `/users/bank_account_transfers/statements' - get - utilizada inserindo filtros
    - '/users/bank_accounts' - get
    - '/users/bank_account_transfers' - post - tranferências
- O que faria diferente se tivesse mais tempo:
    - Tocar a landingpage padrão por uma personalizada
    - Utilizar outra lib para estilização (mais eficiente como o nativeWind) foi utilizado o styled-components por maior familiaridade
    - Instalar um .env para guardar o endpoint de acesso (caso fosse uma api externa)
    - Instalar uma lib de icones (font-awesome) para assets mais padronizados ou utilizar svgs
    - Alguns ajustes para evitar repetição de codigo ex: interface de tema, componente de extrato
    - Centralizar algumas interfaces em um só arquivo
    - Criar um detalhamento de extratos e criar e exibir um comprovante no momento da transferência
    - Componentizar o extrato (melhorar a componentização do app em geral)
    - Colocar a paginação nas listas do extrato geral
    - Testar o app de forma mais consistente
- Prints das telas:
![Screenshot_1748499552](https://github.com/user-attachments/assets/dcccabb7-8b46-4699-be03-657e3c1b15c8)
![Screenshot_1748499548](https://github.com/user-attachments/assets/53c56ea1-2126-4ddd-af76-7d8ebc3f427d)
![Screenshot_1748499545](https://github.com/user-attachments/assets/6542de43-6a07-4dc5-a480-9c3ca8c5f431)
![Screenshot_1748499530](https://github.com/user-attachments/assets/b12cfd33-61be-4537-8ab1-a76251ebba18)
![Screenshot_1748499521](https://github.com/user-attachments/assets/e038749c-1104-4424-a089-7afc25ea30aa)
![Screenshot_1748499512](https://github.com/user-attachments/assets/8f0a260e-b7cd-436d-8bc4-c3d6fb9e871a)
![Screenshot_1748499503](https://github.com/user-attachments/assets/e89a5606-42a0-4a66-b1f4-1f5f5ca99ef8)
![Screenshot_1748499496](https://github.com/user-attachments/assets/6205592f-8d25-42a7-94fa-80303cff61c4)
![Screenshot_1748499491](https://github.com/user-attachments/assets/2785d4a2-001c-467f-96f6-3cd1b60700ee)
![Screenshot_1748499484](https://github.com/user-attachments/assets/b88e42d9-a8e5-4454-bace-7aa9053d70fc)
![Screenshot_1748499462](https://github.com/user-attachments/assets/c8bcb6b9-0be4-41cb-b66c-19f2865c4d2c)
![Screenshot_1748499453](https://github.com/user-attachments/assets/af9c0e06-ccd0-47a5-aa74-ddb5912c68ed)
![Screenshot_1748499448](https://github.com/user-attachments/assets/558c4ad9-ad06-4224-8509-4685f37e363c)
![Screenshot_1748499443](https://github.com/user-attachments/assets/96a80621-a9c1-455e-98fe-c54014aa8062)
![Screenshot_1748499428](https://github.com/user-attachments/assets/c6f36788-04b4-4443-a55d-b7d8a979d403)
![Screenshot_1748499541](https://github.com/user-attachments/assets/6e9c20a5-cfd7-453f-8f10-4ddfc9cc9a0d)
![Screenshot_1748499437](https://github.com/user-attachments/assets/9fea2b87-aa29-4e0f-b288-033f45527956)
