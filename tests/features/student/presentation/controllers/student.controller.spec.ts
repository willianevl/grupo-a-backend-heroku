import { DeleteResult } from "typeorm";
import { StudentEntity } from "../../../../../src/core/infra";
import { HttpRequest, notFound, ok, serverError } from "../../../../../src/core/presentation";
import { StudentRepository } from "../../../../../src/features/students/infra";
import { StudentController } from "../../../../../src/features/students/presentation/controllers";


const makeSut = (): StudentController => new StudentController(new StudentRepository());

const makeRequestStore = (): HttpRequest => ({
    body: {
        ra: "any_ra1",
        name: "any_name",
        cpf: "02862007080",
        email: "willianevaldt@gmail.com" 
    },
    params: {},
});

const makeRequestByRa = (): HttpRequest => ({
    params: { ra: "any_RA" },
    body: {},
});

const makeStudentResult = () => ({
    ra: "any_ra1",
    name: "any_name",
    cpf: "02862007080",
    email: "willianevaldt@gmail.com"
});

const makeRequestUpdate = (): HttpRequest => ({
    body: {
        ra: "any_ra",
        name: "any_name",
        cpf: "any_cpf",
        email: "any_email"
    },
    params: {ra: "any_ra"}
});

const makeDeleteResult = (): DeleteResult => {
    return {
        raw: "any_raw",
        affected: 1 | 0
    };
}

describe("Student Controller", () => {
    describe("Create", () => {
        test("Should return status code 500", async () => {
            jest.spyOn(StudentRepository.prototype, "create").
            mockRejectedValue(new Error());

            const sut = makeSut();
            const result = await sut.create(makeRequestStore());
            expect(result).toEqual(serverError());
        });

        test("Should call repository with correct values", async () => {
            const createSpy = jest.spyOn(StudentRepository.prototype, "create")
                .mockResolvedValue(makeRequestStore().body);

            const sut = makeSut();
            const data = makeRequestStore();
            await sut.create(data);

            expect(createSpy).toHaveBeenCalledWith(makeRequestStore().body);
        });
    });

    describe("Show", () => {
        test("Should return status code 500", async () => {
            jest.spyOn(StudentRepository.prototype, "getStudent")
                .mockRejectedValue(new Error());

            const sut = makeSut();
            const result = await sut.show(makeRequestByRa());
            expect(result).toEqual(serverError());
        });

        test("Should return status code 404 when student doesn't exist", async () => {
            jest.spyOn(StudentRepository.prototype, "getStudent")
            .mockResolvedValue(undefined);

            const sut = makeSut();
            const result = await sut.show(makeRequestByRa());

            expect(result).toEqual(notFound());
        });

        test("Should return a student with status code 200", async () => {
            jest.spyOn(StudentRepository.prototype, "getStudent")
            .mockResolvedValue(makeStudentResult());

            const sut = makeSut();
            const result = await sut.show(makeRequestByRa());

            expect(result).toEqual(ok(makeStudentResult()));
        });
    });

    describe("Index", () => {
        test("Should return status code 500", async () => {
            jest
            .spyOn(StudentRepository.prototype, "getStudents")
            .mockRejectedValue(new Error());

            
            const sut = makeSut();
            const result = await sut.index();
            expect(result).toEqual(serverError());
        });

        test("Should return students list", async () => {
            jest.spyOn(StudentRepository.prototype, "getStudents")
            .mockResolvedValue([makeStudentResult()]);

            const sut = makeSut();
            const result = await sut.index();

            expect(result).toStrictEqual(ok([makeStudentResult()]))
        });
    });

    describe("Update", () => {
        test("Should return status code 500", async () => {
            jest.spyOn(StudentRepository.prototype, "update")
            .mockRejectedValue(new Error());

            
            const sut = makeSut();
            const result = await sut.update(makeRequestUpdate());
            expect(result).toEqual(serverError());
        });

        test("Should update a student and return status code 200", async () => {
            jest.spyOn(StudentRepository.prototype, "update")
                .mockResolvedValue(makeStudentResult());
            
            const sut = makeSut();
            const result = await sut.update(makeRequestUpdate());

            expect(result).toStrictEqual(ok(makeStudentResult()));
        });
    });

    describe("Delete", () => {
        test("Should return status code 500", async () => {
            jest
            .spyOn(StudentRepository.prototype, "delete")
            .mockRejectedValue(new Error());

            
            const sut = makeSut();
            const result = await sut.delete(makeRequestByRa());
            expect(result).toEqual(serverError());
        });

        test("Should delete a student and return status code 200", async () => {
            jest.spyOn(StudentRepository.prototype, "delete")
                .mockResolvedValue(makeDeleteResult());

            const sut = makeSut();
            const result = await sut.delete(makeRequestByRa());

            expect(result).toStrictEqual(ok(makeDeleteResult()));
        });
    });
});