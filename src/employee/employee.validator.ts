import { Employee } from "./employee.types";
export function validateEmployee(emp: Employee): { valid: boolean } {
    if (!emp.name || emp.name.trim() === '') return { valid: false};
    if (!emp.salary || emp.salary < 1) return { valid: false};
    if (!emp.jobTitle || emp.jobTitle.trim() === '') return { valid: false};
    if (!emp.country || emp.country.trim() === '') return { valid: false};
    return { valid: true }
}