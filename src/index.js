import { createServer } from './server.js';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/error.js';

const app = createServer();
const port = process.env.PORT || 3000;

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});