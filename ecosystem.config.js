// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'oyo-movers-customer',
      cwd: '/var/www/oyomovers/oyo-movers-customer',
      script: 'npm',
      args: 'start',
      exec_mode: 'fork', // Next.js works best with fork mode (single instance)
      instances: 1,
      autorestart: true,
      max_memory_restart: '512M',
      kill_timeout: 3000,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 8013,
        HOST: '0.0.0.0'
      },
      log_file: '/var/www/oyomovers/oyo-movers-customer/log/pm2/oyo-movers-customer.log',
      out_file: '/var/www/oyomovers/oyo-movers-customer/log/pm2/oyo-movers-customer-out.log',
      error_file: '/var/www/oyomovers/oyo-movers-customer/log/pm2/oyo-movers-customer-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};


