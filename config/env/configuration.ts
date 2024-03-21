export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  SOCKET_PORT: parseInt(process.env.SOCKET_PORT, 10) || 80,
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS,
});
