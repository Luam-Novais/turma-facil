import { type Request, Response, NextFunction } from "express"
export class HttpError extends Error{
    status:number
    constructor(status: number, message:string){    
        super(message)
        this.status = status
    }
}

export const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction)=>{
    console.error(error)
    res.status(error.status).json({messageError: error.message})
}
