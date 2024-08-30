import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    // if (err instanceof Error) {
    //     res.status(500).json({ error: err.message });
    // } else {
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
    res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR', error_description: 'Erro interno no servidor' });
};

export default errorMiddleware;