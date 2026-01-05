import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './database/mongodb';
import { PORT } from './config';
import authRoutes from "./routes/auth.route";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    return res.status(200).json({ success: "true", message: "Welcome to the API" });
});
async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server: http://localhost:${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map