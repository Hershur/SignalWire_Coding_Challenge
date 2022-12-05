import express, {
    ErrorRequestHandler, 
    Request,
    Response, 
    NextFunction
} from "express";
import { router as userRoutes } from './routes/user';


const app: express.Application = express();
const port = 3000;

app.use(express.json());


app.get( "/health", ( req, res ) => {
    res.send("Service running");
} );


app.use('/api/v1', userRoutes);

app.use(function(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    res.status(500).json(err);
    process.exit(1);
});


app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
