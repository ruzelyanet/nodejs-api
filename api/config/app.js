module.exports = {
  appPort: 3004,
  mongoUri: "mongodb://localhost:27017/online-store",
  jwt: {
    secret: "ne vse mogut v IT",
    tokens: {
      access: {
        type: "access",
        expiresIn: "1h"
      },
      refresh: {
        type: "refresh",
        expiresIn: "2h"
      }
    }
  }
};
