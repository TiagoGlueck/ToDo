import { HttpError } from '../errors/http-errors.js';

export function errorHandler(err, req, res, next) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ erro: err.message });
    }

    // JSON malformado no corpo da requisição (lançado pelo express.json())
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ erro: 'JSON inválido' });
    }

    console.error(err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
}
