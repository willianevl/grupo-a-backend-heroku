import { StudentEntity } from "../../../../core/infra";
import { badRequest, HttpMiddleware, HttpResponse, Middleware, ok, StudentAlreadyExistsError } from "../../../../core/presentation";

export class StudentAlreadyExistsMiddleware implements Middleware {
    async handle(request: HttpMiddleware): Promise<HttpResponse> {
        const { ra, cpf } = request.body;

        const raExists = await StudentEntity.findOne({
            where: {ra}
        });

        const cpfExists = await StudentEntity.findOne({
            where: {cpf}
        });

        if(cpfExists) return badRequest(new StudentAlreadyExistsError(`cpf: ${cpf}`));
        if(raExists) return badRequest(new StudentAlreadyExistsError(`ra: ${ra}`));

        return ok({});
    };
};