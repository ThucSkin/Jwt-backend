// Middleware để xử lý CORS
const configCors = (app) => {
    app.use(
        cors({
            credentials: true,
            origin
        }),
    );
}

export default configCors