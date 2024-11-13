import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router } from './routes';
import { errorHandler } from './middleware/error';
import { validateApiKeys } from './config/models';
import { VirtualDependencySystem } from './dependency/VirtualDependencySystem';
import { DependencyResolver } from './dependency/DependencyResolver';

// Load environment variables
config();

// Initialize virtual dependency system
const virtualDependencySystem = VirtualDependencySystem.getInstance();
const dependencyResolver = DependencyResolver.getInstance();

// Validate API keys
validateApiKeys();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});