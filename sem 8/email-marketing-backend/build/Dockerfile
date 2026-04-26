FROM php:8.2-fpm

WORKDIR /var/www

# --------------------------------------------------
# System + Chromium dependencies
# --------------------------------------------------
RUN apt-get update && apt-get install -y \
    vim nano \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libonig-dev \
    libicu-dev \
    libxml2-dev \
    zip unzip \
    curl gnupg ca-certificates \
    \
    chromium \
    chromium-driver \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxshmfence1 \
    xdg-utils \
    supervisor

# --------------------------------------------------
# Install Node.js 20
# --------------------------------------------------
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# --------------------------------------------------
# Prevent puppeteer from downloading Chromium
# --------------------------------------------------
ENV PUPPETEER_SKIP_DOWNLOAD=true

# --------------------------------------------------
# Install Puppeteer globally
# --------------------------------------------------
RUN npm install -g puppeteer

# --------------------------------------------------
# Required ENV vars for Browsershot
# --------------------------------------------------
ENV NODE_PATH=/usr/lib/node_modules
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# --------------------------------------------------
# Cleanup
# --------------------------------------------------
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# --------------------------------------------------
# PHP Extensions
# --------------------------------------------------
RUN docker-php-ext-install mysqli pdo pdo_mysql mbstring intl zip exif pcntl

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd \
  && docker-php-source delete

# --------------------------------------------------
# Composer
# --------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json ./

RUN composer install --no-dev --no-scripts --prefer-dist --no-interaction

COPY . .

RUN chown www-data:www-data .

COPY ./build/php/laravel.ini /usr/local/etc/php/conf.d/laravel.ini

RUN composer dump-autoload

RUN php artisan storage:link || true \
    && php artisan optimize || true

# --------------------------------------------------
# Supervisor config
# --------------------------------------------------
RUN mkdir -p /var/log/supervisor

COPY build/supervisor /etc/supervisor/conf.d

# Copy custom entrypoint script and set executable permissions
COPY ./build/app-entrypoint.bash /usr/local/bin/app-entrypoint.bash
RUN chmod +x /usr/local/bin/app-entrypoint.bash \
  && chown www-data:www-data /usr/local/bin/app-entrypoint.bash

# Set entrypoint script (exec form keeps CMD args)
ENTRYPOINT ["/usr/local/bin/app-entrypoint.bash"]

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
