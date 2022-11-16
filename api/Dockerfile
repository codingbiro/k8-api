FROM --platform=linux/amd64 node:16

# Env
ENV NODE_ENV development
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install dependencies
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install

# Copy and build app
WORKDIR /usr/app
COPY . .
RUN npx prisma generate
RUN yarn prebuild && yarn build

EXPOSE 4000

CMD ["yarn", "start:prod"]