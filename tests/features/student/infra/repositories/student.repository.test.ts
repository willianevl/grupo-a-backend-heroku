import { Student } from "../../../../../src/features/students/domain";
import { StudentEntity } from "../../../../../src/core/infra";
import Database from "../../../../../src/core/infra/data/connections/database";
import { StudentRepository } from "../../../../../src/features/students/infra";

const makeStudentParams = async (): Promise<Student> => {
    return {
        ra: "any_ra",
        name: "any_name",
        cpf: "02862007080",
        email: "willianevaldt@gmail.com"
    };
};

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
        cpf: "02862007080",
        email: "willianevaldt@gmail.com"
    }).save();

    return [studentA, studentB];
};

const makeStudentDB = async (): Promise<StudentEntity> => {
    return await StudentEntity.create({
        ra: "any_ra1",
        name: "any_name",
        cpf: "02862007080",
        email: "willianevaldt@gmail.com"
    }).save();
};

const makeUpdateParams = async (): Promise<Student> => {
    const student = await makeStudentDB();
    return {
        ra: student.ra,
        name: "any_name",
        cpf: student.cpf,
        email: "willianevaldt@gmail.com"
    };
};



describe("Student Repository", () => {
    beforeAll(async () => {
        await new Database().openConnection();
    });

    beforeEach(async () => {
        await StudentEntity.clear()
    });

    afterAll(async () => {
        await new Database().disconnectDatabase();
    });

    describe("create", () => {
        test("Should return a student when successful", async() => {
            const sut = new StudentRepository();
            const params = await makeStudentParams();
            const result = await sut.create(params);

            expect(result).toBeTruthy();
            expect(result.ra).toBe("any_ra");
            expect(result.name).toBe("any_name");
            expect(result.cpf).toBe("02862007080");
            expect(result.email).toBe("willianevaldt@gmail.com");
        });
    });

    describe("Get Students", () => {
        test("Should return the list of students", async () => {
            const sut = new StudentRepository();
            const students = await makeStudentsDB();
            const result = await sut.getStudents();

            expect(result).toBeTruthy();
            expect(result.length).toBe(students.length);
            expect(result[0].ra).toStrictEqual(students[0].ra);
        });
    });

    describe("Get Student", () => {
        test("Should return undefined when RA does not exist", async () => {
            const sut = new StudentRepository();
            const result = await sut.getStudent("any");

            expect(result).toBeFalsy();
        });

        test("Should return a student when RA exists", async () => {
            const sut = new StudentRepository();
            const student = await makeStudentDB();
            const result = await sut.getStudent(student.ra);

            expect(result).toBeTruthy();
            expect(result?.ra).toBe(student.ra);
            expect(result?.name).toBe(student.name);
            expect(result?.cpf).toStrictEqual(student.cpf);
            expect(result?.email).toStrictEqual(student.email);
        });
    });

    describe("Update", () => {
        test("Should return a student with updated data", async () => {
            const sut = new StudentRepository();
            const student = await makeStudentDB();
            const params = await makeUpdateParams();

            const result = await sut.update(student.ra, params);

            expect(result).toBeTruthy();
        });
    });

    describe("Delete", () => {
        test("Should delete a student", async () => {
            const sut = new StudentRepository();
            const student = await makeStudentDB();

            const result = await sut.delete(student.ra);

            expect(result).toBeTruthy();
        }); 
    }); 

});