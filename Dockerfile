# docker build -t redpanda .
# docker run --rm -it -p 8080:8080 redpanda

FROM caddy:2

# Copy built application
RUN mkdir -p /usr/share/caddy/redpanda
COPY dist /usr/share/caddy/redpanda

COPY Caddyfile /etc/caddy/Caddyfile
RUN caddy validate --config /etc/caddy/Caddyfile
