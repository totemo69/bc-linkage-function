
const dbService = () => {
  const authenticateDB = () => database.authenticate();
  const dropDB = () => database.drop();
  const syncDB = () => database.sync();

  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const start = async () => {
    try {
      await authenticateDB();
      await startMigrateTrue();
    } catch (err) {
      errorDBStart(err);
    }
  };

  return {
    start,
  };

};

module.exports = dbService;