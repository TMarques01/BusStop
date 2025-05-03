# BuzStop

![BuzStop Logo](./public/capa.png)

## O Problema

Atualmente, muitas aplicações de transporte público dependem de integrações com sistemas das transportadoras, como GPS instalados nos autocarros ou APIs fornecidas pelas operadoras. Contudo, essas soluções são limitadas a zonas urbanas onde tais sistemas estão implementados e atualizados. Em muitas localidades — especialmente em áreas suburbanas e rurais — os passageiros continuam sem acesso a informações confiáveis sobre horários ou atrasos. Essa falta de transparência resulta em frustração, perda de tempo e uma experiência negativa para os utilizadores.

## A Solução

O BuzStop é uma aplicação inovadora que adota uma abordagem descentralizada e colaborativa. Qualquer utilizador pode reportar, em tempo real, a passagem de um autocarro, contribuindo para um mapa interativo acessível a todos. Este mapa permite visualizar a localização recente dos autocarros e prever atrasos, melhorando significativamente a experiência dos passageiros. A solução não depende de hardware específico nos veículos nem de parcerias com transportadoras, o que a torna altamente escalável e aplicável em qualquer região. É uma forma simples, inclusiva e eficaz de transformar o transporte público.

## Tecnologias Utilizadas

### Frontend

- **ReactJS**: Desenvolvimento da interface web.
- **React Router**: Navegação entre páginas (Mapa e Histórico).
- **Leaflet.js + React-Leaflet**: Implementação de mapas interativos com marcadores.
- **Geolocation API**: Obtenção da localização atual do utilizador.

### Backend

- **Firebase Firestore**: Base de dados em tempo real para armazenamento e sincronização de dados.

### Design e Prototipagem

- **Figma**: Criação de mockups e protótipos da interface.

## Como Executar o Projeto

1. **Configuração Inicial**:
    - Instale o React.
    - Configure uma base de dados Firebase e associe-a ao ficheiro `src/firebase.js`.

2. **Instalar Dependências**:
    ```bash
    npm install react-leaflet leaflet
    npm install firebase
    ```

3. **Executar o Código**:
    ```bash
    npm start
    ```
