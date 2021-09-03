import { Request, Response } from "express";
import { EMvc, HttpRequest, HttpResponse } from "..";
import { MvcController } from "../contracts";

export const routerMvcAdapter = (controller: MvcController, type: EMvc) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    };

    let httpResponse: HttpResponse;

    switch (type) {
      case EMvc.CREATE:
        httpResponse = await controller.create(httpRequest);
        break;
      case EMvc.SHOW:
        httpResponse = await controller.show(httpRequest);
        break;
      case EMvc.INDEX:
        httpResponse = await controller.index(httpRequest);
        break;
      case EMvc.UPDATE:
        httpResponse = await controller.update(httpRequest);
        break;
      case EMvc.DELETE:
        httpResponse = await controller.delete(httpRequest);
        break;
    }

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
