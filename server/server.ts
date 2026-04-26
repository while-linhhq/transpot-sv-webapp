import 'dotenv/config';

import { createApp } from './app';
import { logger } from './utils/logger';

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '0.0.0.0';

const app = createApp();

app.listen(port, host, () => {
  logger.info({ host, port }, 'Server listening');
});

