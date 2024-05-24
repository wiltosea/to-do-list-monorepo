# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package.json .

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação React
RUN npm run build

# Instale o servidor estático para servir os arquivos construídos
RUN npm install serve -g

# Exponha a porta que a aplicação vai usar
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "run", "preview"]
