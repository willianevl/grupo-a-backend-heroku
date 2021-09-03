import { StudentEntity } from "../../../../core/infra";
import { Student } from "../../domain";

export class StudentRepository {
    async create(params: Student): Promise<Student> {
        const { ra, name, cpf, email } = params;

        const student = await StudentEntity.create({
            ra,
            name,
            cpf,
            email
        }).save();

        return Object.assign({}, params, student);
    };

    async getStudent(ra: string): Promise<Student | undefined> {
        const student = await StudentEntity.findOne({ra: ra});

        if(!student) return undefined;

        return {
            ra: student.ra,
            name: student.name,
            cpf: student.cpf,
            email: student.email,
        } as Student;
    };

    async getStudents(): Promise<Student[]> {
        const students = await StudentEntity.find();

        return students.map((student) => {
            return {
                ra: student.ra,
                name: student.name,
                cpf: student.cpf,
                email: student.email,
            } as Student;
        });
    };

    async update(uid: string, params: Student): Promise<Student> {
        const { name, email } = params;

        const student = await StudentEntity.update(uid, {name, email});

        return Object.assign({}, params, student);
    };

    async delete(uid: string){
        return await StudentEntity.delete(uid);
    }
}