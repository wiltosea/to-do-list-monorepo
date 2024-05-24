# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["node", "src/server.js"]
