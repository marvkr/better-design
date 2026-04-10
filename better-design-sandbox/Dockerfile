FROM e2bdev/base

WORKDIR /home/user

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
