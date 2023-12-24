import App from './app';
import 'dotenv/config';

const app = new App();

const PORT: number = process.env.PORT || 3001;
app.listen(PORT);
