FROM node:10.16.3-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser" \
  NODE_ENV="production"
RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache \
  dumb-init \
  udev \
  ttf-freefont \
  font-adobe-100dpi \
  chromium \
  && apk add wqy-zenhei --update-cache --repository http://nl.alpinelinux.org/alpine/edge/testing --allow-untrusted \
  && npm install puppeteer-core@1.20.0 --silent \
  \
  # Cleanup
  && apk del --no-cache make gcc g++ python binutils-gold gnupg libstdc++ \
  && rm -rf /usr/include \
  && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/* \
  && echo

COPY . /app
VOLUME ["/config", "/torrents"]
WORKDIR /app
RUN npm install --quiet
RUN ls 
CMD ["node", "index.js"]