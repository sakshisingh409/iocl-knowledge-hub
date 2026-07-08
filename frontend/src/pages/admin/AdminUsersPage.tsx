import { useState } from "react";
import { Search, UserCheck, ShieldAlert, Trash2, Mail, MapPin, Building2 } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  location: string;
  role: "employee" | "admin";
  status: "active" | "inactive";
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "emp-1",
    name: "Rajesh Kumar",
    email: "employee@iocl.in",
    employeeId: "IOCL-48721",
    department: "Refinery & Pipelines",
    designation: "Chief Operations Engineer",
    location: "Panipat Refinery",
    role: "employee",
    status: "active",
  },
  {
    id: "emp-2",
    name: "Admin User",
    email: "admin@iocl.in",
    employeeId: "IOCL-10001",
    department: "Corporate IT",
    designation: "Executive Director - IT",
    location: "Corporate Office",
    role: "admin",
    status: "active",
  },
  {
    id: "emp-3",
    name: "Sneha Sharma",
    email: "sneha.sharma@iocl.in",
    employeeId: "IOCL-55219",
    department: "HR Operations",
    designation: "Manager (HR)",
    location: "Corporate Office",
    role: "employee",
    status: "active",
  },
  {
    id: "emp-4",
    name: "Amit Varma",
    email: "amit.varma@iocl.in",
    employeeId: "IOCL-30129",
    department: "Safety & Compliance",
    designation: "Safety Officer",
    location: "Mathura Refinery",
    role: "employee",
    status: "active",
  },
  {
    id: "emp-5",
    name: "Priyanuj Gogoi",
    email: "p.gogoi@iocl.in",
    employeeId: "IOCL-88214",
    department: "Operations",
    designation: "Senior Engineer",
    location: "Digboi Refinery",
    role: "employee",
    status: "inactive",
  },
];

export default function AdminUsersPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = ["All", "Corporate IT", "Refinery & Pipelines", "HR Operations", "Safety & Compliance", "Operations"];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === "All" || emp.department === deptFilter;

    return matchesSearch && matchesDept;
  });

  const toggleStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? { ...emp, status: emp.status === "active" ? "inactive" : "active" }
          : emp
      )
    );
  };

  const toggleRole = (id: string, name: string) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;

    const nextRole = emp.role === "admin" ? "employee" : "admin";
    if (confirm(`Change authorization level of "${name}" to ${nextRole.toUpperCase()}?`)) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === id ? { ...e, role: nextRole } : e))
      );
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete employee account "${name}"? This action cannot be undone.`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header block */}
      <div>
        <p className="text-[11px] font-bold tracking-widest text-iocl-orange uppercase">
          DIRECTORY ACCESS
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-iocl-navy">User Management</h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Audit employee logins, manage roles, adjust department mappings, and toggle status controls.
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees by name, email, or employee ID..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/15"
          />
        </div>

        {/* Department Filter */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Dept:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/15"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-150">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Department & Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Access Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition">
                  {/* Name and Designation */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-iocl-navy border border-slate-200">
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800">{emp.name}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" /> {emp.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Employee ID */}
                  <td className="px-6 py-4 text-xs font-bold text-slate-700">
                    {emp.employeeId}
                  </td>

                  {/* Department & Designation */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {emp.department}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">{emp.designation}</p>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-slate-500 font-medium text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {emp.location}
                    </span>
                  </td>

                  {/* Role (User/Admin badge) */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRole(emp.id, emp.name)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase transition border cursor-pointer ${
                        emp.role === "admin"
                          ? "bg-red-50 text-red-700 border-red-100 hover:bg-red-100"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                      title="Click to toggle access privileges"
                    >
                      {emp.role === "admin" ? <ShieldAlert className="h-3 w-3 text-red-500" /> : <UserCheck className="h-3 w-3 text-slate-400" />}
                      {emp.role}
                    </button>
                  </td>

                  {/* Status Indicator */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(emp.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase transition cursor-pointer border ${
                        emp.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}
                      title={`Click to ${emp.status === "active" ? "Deactivate" : "Activate"}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${emp.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {emp.status}
                    </button>
                  </td>

                  {/* Actions column */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(emp.id, emp.name)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete user account"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No matching employee accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
