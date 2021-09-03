import { HttpRequest, HttpResponse, MvcController, notFound, ok, serverError } from "../../../../core/presentation";
import { StudentRepository } from "../../infra";

export class StudentController implements MvcController {

    readonly #repository: StudentRepository;

    constructor(repository: StudentRepository) {
        this.#repository = repository;
    };

    async create(request: HttpRequest): Promise<HttpResponse> {
        try {
            const student = await this.#repository.create(request.body);

            return ok(student);
        } catch (error){
            console.log(error)
            return serverError();
        }
    };

    async index(): Promise<HttpResponse> {
        try {
            const students = await this.#repository.getStudents();

            return ok(students);
        } catch (error){
            return serverError();
        }
    };

    async show(request: HttpRequest): Promise<HttpResponse> {
        const { ra } = request.params;

        try {
            const student = await this.#repository.getStudent(ra);
            if(!student) return notFound();

            return ok(student);
        } catch (error){
            return serverError();
        }
    };

    async delete(request: HttpRequest): Promise<HttpResponse> {
        const { ra } = request.params;

        try {
            const result = await this.#repository.delete(ra);

            return ok(result);
        } catch (error){
            return serverError();
        }
    };

    async update(request: HttpRequest): Promise<HttpResponse> {
        const { ra } = request.params;

        try {
            const result = await this.#repository.update(ra, request.body);

            return ok(result)
        } catch (error){
            return serverError();
        }
    };
    
}