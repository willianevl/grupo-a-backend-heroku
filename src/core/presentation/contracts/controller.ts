import { HttpRequest, HttpResponse } from "../models";

export interface MvcController {
  create(request: HttpRequest): Promise<HttpResponse>;
  index(request: HttpRequest): Promise<HttpResponse>;
  show(request: HttpRequest): Promise<HttpResponse>;
  delete(request: HttpRequest): Promise<HttpResponse>;
  update(request: HttpRequest): Promise<HttpResponse>;
}
