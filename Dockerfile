FROM debian:stable

WORKDIR /app

# Update package list and install prerequisites
RUN apt update && apt install -y curl sudo && rm -rf /var/lib/apt/lists/*

# Install Node.js (using NodeSource)
RUN curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN apt install -y nodejs

COPY . .

RUN npm ci

EXPOSE 3000

CMD node server.js >>/var/logs/api-gateway/server.log 2>&1
