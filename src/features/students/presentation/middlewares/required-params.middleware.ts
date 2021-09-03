import { badRequest, CpfValidator, EmailValidator, HttpMiddleware, HttpResponse, Middleware, ok, RequireFieldsValidator } from "../../../../core/presentation";
import { Student } from "../../domain";

export class RequiredParamsMiddleware implements Middleware {
    async handle(request: HttpMiddleware): Promise<HttpResponse> {
        const body: Student = request.body;

        const requiredFields = [
            "ra", "name", "cpf", "email"
        ];

        for(const field of requiredFields) {
            const error = new RequireFieldsValidator(field).validate(body);
            if(error) return badRequest(error);
        };

        const emailError = new EmailValidator('email').validate(body);
        if(emailError) return badRequest(emailError);

        const cpfError = new CpfValidator('cpf').validate(body);
        if(cpfError) return badRequest(cpfError);

        return ok({});
    };
};