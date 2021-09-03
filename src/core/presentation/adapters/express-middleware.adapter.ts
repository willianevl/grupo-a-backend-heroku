import { NextFunction, Response, Request } from "express";
import { Middleware } from "../contracts";
import { HttpMiddleware, HttpResponse } from "../models";

export const middlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: HttpMiddleware = {
      body: req.body,
      headers: req.headers,
    };

    const httpResponse: HttpResponse = await middleware.handle(request);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
