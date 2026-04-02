import { Employee } from "./employee.types";
export function validateEmployee(emp: Employee): { valid: boolean } {
    if (emp.name === '') return { valid: false};
    if (emp.salary < 1) return { valid: false};
    if (emp.jobTitle === '') return { valid: false};
    if (emp.country === '') return { valid: false};
    return { valid: true }
}