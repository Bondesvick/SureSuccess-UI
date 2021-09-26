import { StudentResponse } from "./StudentResponse";

export interface PaginatedStudents {
    pageIndex: number;
    pageSize: number;
    total: number;
    data: StudentResponse[];
}