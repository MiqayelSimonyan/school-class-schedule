import { ITeacher } from "types/store/teacher";

export type ILoginRegister = {
    mode: string;
    teacher: ITeacher;
};

export type IIsAuth = {
    isAuth: boolean;
    teacher: ITeacher;
};