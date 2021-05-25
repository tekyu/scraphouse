export const config = {
  ports: {
    app: parseInt(process.env.PORT, 10)
  },

  socket: process.env.REACT_APP_SOCKET_ADDRESS,

  backend: process.env.REACT_APP_BACKEND_ADDRESS,

  /**
   * API configs
   */
  endpoints: {
    api: `/api`
  }
};
