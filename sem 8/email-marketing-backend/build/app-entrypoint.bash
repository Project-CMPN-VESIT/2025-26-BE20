#!/bin/bash
set -e

echo "Setting permissions for Laravel directories..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

if [ ! -f /var/www/vendor/autoload.php ]; then
	echo "vendor/ missing, running composer install (no-dev)..."
	composer install --no-dev --prefer-dist --no-interaction || true
fi

echo "Running Laravel optimizations..."
php artisan key:generate --force || true
php artisan migrate --force || true
php artisan optimize || true

echo "Ensuring Horizon restarts fresh..."
php artisan horizon:terminate || true

echo "Starting Supervisor..."
exec "$@"

