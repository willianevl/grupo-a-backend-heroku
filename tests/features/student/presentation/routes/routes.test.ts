import App from "../../../../../src/core/presentation/app";
import { StudentEntity } from "../../../../../src/core/infra";
import Database from "../../../../../src/core/infra/data/connections/database";
import express, { Router } from "express";
import request from "supertest";
import { StudentRoutes } from "../../../../../src/features/students/presentation";
import { StudentRepository } from "../../../../../src/features/students/infra";


const makeStudentsDB = async (): Promise<StudentEntity[]> => {
    const studentA = await StudentEntity.create({
        ra: "any_ra1",
        name: "any_name",
        cpf: "02862007080",
        email: "willianevaldt@gmail.com"
    }).save();

    const studentB = await StudentEntity.create({
        ra: "any_ra2",
        name: "any_name",
        cpf: "36801574019",
        email: "willianevaldt@gmail.com"
    }).save();

    return [studentA, studentB];
};

const makeStudentDB = async (): Promise<StudentEntity> => {
    return await StudentEntity.create({
        ra: "any_ra1",
        name: "any_name",
        cpf: "50278494005",
        email: "willianevaldt@gmail.com"
    }).save();
};

describe("Student Routes", () => {
    const server = new App().server;

    beforeAll(async () => {
        await new Database().openConnection();
        const router = Router();
        server.use(express.json());
        server.use(router);

        new StudentRoutes().init(router)
    });

    beforeEach(async () => {
        await StudentEntity.clear();
        jest.resetAllMocks();
    });

    describe("/GET", () => {
        test("Should return students list", async () => {
            const students = await makeStudentsDB();
        
            await request(server).get("/student").send().expect(200)
                .expect((res) => {
                    expect((res.body as []).length).toBe(students.length);
                });
        });

        test("Should return status code 500", async () => {
            jest.spyOn(StudentRepository.prototype, "getStudents").mockRejectedValue(null);

            await request(server).get("/student").send().expect(500);
        });
    });

    describe("/GET:ra", () => {
        test("Should return a student when RA exists", async () => {
            const student = await makeStudentDB();

            await request(server).get(`/student/${student.ra}`).send().expect(200)
                .expect((res) => {
                    expect(res.body.ra).toBe(student.ra);
                });
        });

        test("Should return status code 404 when student doesn't exist", async () => {
                await request(server).get(`/student/${"any"}`).send().expect(404, {
                error: "No data found",
            });
        });
    });

    describe("/POST", () => {
        test("Should return status code 400 when trying to create a student without ra", async () => {
            await request(server).post("/student")
            .send({
                name: "any_name",
                cpf: "02862007080",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Missing param: ra' });
        });

        test("Should return status code 400 when trying to create a student without name", async () => {
            await request(server).post("/student")
            .send({
                ra: "any_ra",
                cpf: "02862007080",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Missing param: name' });
        });

        test("Should return status code 400 when trying to create a student without cpf", async () => {
            await request(server).post("/student")
            .send({
                ra: "any_ra",
                name: "any_name",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Missing param: cpf' });
        });

        test("Should return status code 400 when trying to create a student without email", async () => {
            await request(server).post("/student")
            .send({
                ra: "any_ra",
                name: "any_name",
                cpf: "02862007080"
            }).expect(400, { error: 'Missing param: email' });
        });

        test("Should return status code 400 when trying to create a student with an invalid email", async () => {
            await request(server).post("/student")
            .send({
                ra: "any_ra",
                name: "any_name",
                email: "willian",
                cpf: "02862007080"
            }).expect(400, { error: 'Invalid param: email' });
        });

        test("Should return status code 400 when trying to create a student with an invalid cpf", async () => {
            await request(server).post("/student")
            .send({
                ra: "any_ra",
                name: "any_name",
                email: "willianevaldt@gmail.com",
                cpf: "028620070801"
            }).expect(400, { error: 'Invalid param: cpf' });
        });

        test("Should return status code 400 when already exists a student with the same ra", async () => {
            await makeStudentDB();

            await request(server).post("/student")
            .send({
                name: "any_name",
                ra: "any_ra1",
                cpf: "31203989008",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Student already exists with this ra: any_ra1' });
        });

        test("Should return status code 400 when already exists a student with the same cpf", async () => {
            await makeStudentDB();

            await request(server).post("/student")
            .send({
                name: "any_name",
                ra: "any_ra1",
                cpf: "50278494005",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Student already exists with this cpf: 50278494005' });
        });

        test("Should return status code 200 when successful", async () => {
            await request(server).post("/student")
              .send({
                name: "any_name",
                ra: "any_ra1",
                cpf: "50278494005",
                email: "willianevaldt@gmail.com"
              })
              .expect(200)
              .expect((res) => {
                expect(res.body.ra).toBe("any_ra1");
                expect(res.body.name).toBe("any_name");
                expect(res.body.cpf).toBe("50278494005");
                expect(res.body.email).toBe("willianevaldt@gmail.com");
              });
          });
    });

    describe("/PUT:ra", () => {
        test("Should return status code 400 when trying to update a student without ra", async () => {
            const student = await makeStudentDB();

            await request(server).put(`/student/${student.ra}`)
            .send({
                name: "any_name",
                cpf: student.cpf,
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Missing param: ra' });
        });

        test("Should return status code 400 when trying to update a student without name", async () => {
            const student = await makeStudentDB();

            await request(server).put(`/student/${student.ra}`)
            .send({
                ra: student.ra,
                cpf: "02862007080",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Missing param: name' });
        });

        test("Should return status code 400 when trying to create a student without cpf", async () => {
            const student = await makeStudentDB();

            await request(server).put(`/student/${student.ra}`)
            .send({
                ra: student.ra,
                name: "any_name",
                email: "willianevaldt@gmail.com"
            }).expect(400, { error: 'Missing param: cpf' });
        });

        test("Should return status code 400 when trying to create a student without email", async () => {
            const student = await makeStudentDB();

            await request(server).put(`/student/${student.ra}`)
            .send({
                ra: student.ra,
                name: "any_name",
                cpf: student.cpf
            }).expect(400, { error: 'Missing param: email' });
        });


        test("Should return status code 200 when successful", async () => {
            const student = await makeStudentDB();

            await request(server).put(`/student/${student.ra}`)
              .send({
                name: "any_name",
                ra: student.ra,
                cpf: student.cpf,
                email: "willianevaldt@gmail.com"
              })
              .expect(200)
              .expect((res) => {
                expect(res.body.ra).toBe("any_ra1");
                expect(res.body.name).toBe("any_name");
                expect(res.body.cpf).toBe("50278494005");
                expect(res.body.email).toBe("willianevaldt@gmail.com");
              });
          });
    });

    describe("/DELETE:ra", () => {
        test("Deveria excluir um recado", async () => {
            const student = await makeStudentDB();

            await request(server).delete(`/student/${student.ra}`)
            .send().expect(200)
            .expect((res) => {
              expect(res.body).toBeTruthy();
            });
        });
    });
});
