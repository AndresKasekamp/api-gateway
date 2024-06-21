FROM debian:stable

WORKDIR /app
# Update package list and install prerequisites
RUN apt-get update && apt-get install -y curl sudo && rm -rf /var/lib/apt/lists/*

# Install Node.js (using NodeSource)
RUN curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN apt-get install -y nodejs

COPY . .

RUN npm ci --omit=dev && npm cache clean --force

EXPOSE 3000

CMD ["node", "server.js"]
