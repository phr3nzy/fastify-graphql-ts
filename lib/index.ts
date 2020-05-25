import config from './config';
import { server } from './server';

const { PORT } = config;

try {
	server.listen(PORT);
} catch (error) {
	server.log.error(error);
}
