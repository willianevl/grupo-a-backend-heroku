import "reflect-metadata";
import Database from "./core/infra/data/connections/database";
import App from "./core/presentation/app";

Promise.all([new Database().openConnection()])
  .then(() => {
    const app = new App();
    app.init();
    app.start(Number(process.env.PORT) || 3000);
  })
  .catch(console.error);
