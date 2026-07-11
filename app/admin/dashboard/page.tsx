"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  LogOut,
  Search,
  Filter,
  Users,
  HeartPulse,
  ShieldPlus,
  Stethoscope,
  CalendarDays,
  Phone,
  User,
  Activity,
  ArrowUpDown,
  FileSpreadsheet,
  Mail,
} from "lucide-react";
import { VKLogo } from "@/components/vk-logo";

interface AppointmentData {
  _id: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Selected appointment for detail modal
  const [activeAppointment, setActiveAppointment] = useState<AppointmentData | null>(null);

  // Fetch appointments
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/appointments");
      if (res.status === 401) {
        // Redirect to login if unauthorized
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);
      } else {
        setError(data.error || "Failed to load appointments");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Make sure server is running and database is connected.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Filter and search appointments
  useEffect(() => {
    let result = [...appointments];

    // Filter by search term (name or contact)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.fullName.toLowerCase().includes(term) ||
          app.contactNumber.includes(term)
      );
    }

    // Filter by department
    if (selectedDept !== "All") {
      result = result.filter((app) => app.department === selectedDept);
    }

    // Sort by Date Booked (createdAt)
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredAppointments(result);
  }, [searchTerm, selectedDept, sortOrder, appointments]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Helper to format date strings
  const formatBookedDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate Metrics
  const totalCount = appointments.length;
  const gastroCount = appointments.filter((a) => a.department === "Gastroenterology").length;
  const neuroCount = appointments.filter((a) => a.department === "Neurosurgery").length;
  const orthoCount = appointments.filter((a) => a.department === "Orthopedics").length;
  const gynoCount = appointments.filter((a) => a.department === "Gynecology").length;

  // Format today's date for comparison
  const todayStr = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const todayCount = appointments.filter((a) => a.date === todayStr).length;

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface-container-low)]">
        <div className="text-center">
          <LoaderSpinner className="h-10 w-10 text-[var(--color-primary)] animate-spin mx-auto" />
          <p className="mt-4 text-sm font-semibold text-[var(--color-primary)]">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-container-low)] pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-outline-variant)] bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VKLogo className="h-10 w-auto" />
            <div className="h-6 w-px bg-[var(--color-outline-variant)] hidden sm:block" />
            <h1 className="text-xl font-bold text-[var(--color-primary)] hidden sm:block">
              Admin OPD Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--color-surface-container-highest)] text-[var(--color-primary)] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to MongoDB
            </span>
            <button
              onClick={handleLogout}
              className="btn-outline border-rose-200 text-rose-700 hover:bg-rose-50 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {error}
          </div>
        )}

        {/* Dashboard Overview Cards */}
        <section className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <MetricCard
            title="Total Booked"
            value={totalCount}
            icon={<Users className="h-5 w-5 text-indigo-600" />}
            colorClass="bg-indigo-50 border-indigo-100"
          />
          <MetricCard
            title="Gastro (OPD)"
            value={gastroCount}
            icon={<HeartPulse className="h-5 w-5 text-rose-600" />}
            colorClass="bg-rose-50 border-rose-100"
          />
          <MetricCard
            title="Neuro (OPD)"
            value={neuroCount}
            icon={<ShieldPlus className="h-5 w-5 text-blue-600" />}
            colorClass="bg-blue-50 border-blue-100"
          />
          <MetricCard
            title="Ortho (OPD)"
            value={orthoCount}
            icon={<Stethoscope className="h-5 w-5 text-emerald-600" />}
            colorClass="bg-emerald-50 border-emerald-100"
          />
          <MetricCard
            title="Gyno (OPD)"
            value={gynoCount}
            icon={<CalendarDays className="h-5 w-5 text-purple-600" />}
            colorClass="bg-purple-50 border-purple-100"
          />
          <MetricCard
            title="Today's OPD"
            value={todayCount}
            icon={<Activity className="h-5 w-5 text-amber-600" />}
            colorClass="bg-amber-50 border-amber-100"
            subtext="Reserved for today"
          />
        </section>

        {/* Filters and Controls */}
        <section className="surface-card p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-outline)]" />
            <input
              type="text"
              placeholder="Search by Patient Name or Contact Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-field pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[var(--color-outline)]" />
              <span className="text-sm font-semibold text-[var(--color-outline)]">Department:</span>
            </div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="form-field py-2.5 px-4 h-11 w-[185px] cursor-pointer"
            >
              <option value="All">All Specialities</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Neurosurgery">Neurosurgery</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gynecology">Gynecology</option>
            </select>

            <button
              onClick={toggleSort}
              className="btn-outline flex items-center gap-2 h-11 px-4 cursor-pointer"
              title="Toggle Booked Date Sort"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="text-sm">Sort: {sortOrder === "desc" ? "Newest" : "Oldest"}</span>
            </button>

            <button
              onClick={fetchAppointments}
              className="btn-secondary h-11 flex items-center justify-center cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </section>

        {/* Appointment Table list */}
        <section className="surface-card overflow-hidden p-0 border border-[var(--color-outline-variant)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--color-surface-container-high)] text-[var(--color-primary)] border-b border-[var(--color-outline-variant)] font-bold uppercase tracking-wider text-2xs">
                <tr>
                  <th className="px-6 py-4">Booked Date</th>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Contact Number</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">OPD Doctor</th>
                  <th className="px-6 py-4">Consultation Date & Slot</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-outline-variant)]">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((app) => (
                    <tr key={app._id} className="hover:bg-[var(--color-surface-container-low)] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-[var(--color-outline)] font-mono text-xs">
                        {formatBookedDate(app.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-[var(--color-primary)]">
                        {app.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[var(--color-on-surface-variant)] font-semibold">
                        {app.contactNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <DeptBadge dept={app.department} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-[var(--color-primary)]">
                        {app.doctor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold flex items-center gap-1.5 text-[var(--color-primary)]">
                            <Calendar className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
                            {app.date}
                          </span>
                          <span className="text-xs text-[var(--color-outline)] flex items-center gap-1.5 mt-0.5">
                            <Clock className="h-3.5 w-3.5" />
                            {app.timeSlot}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-[var(--color-on-surface-variant)]">
                        {app.reason ? app.reason : <span className="text-[var(--color-outline)] italic">None</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => setActiveAppointment(app)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--color-outline-variant)] hover:bg-[var(--color-primary)] hover:text-white transition cursor-pointer"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-[var(--color-outline)]">
                      <FileSpreadsheet className="h-10 w-10 mx-auto text-[var(--color-outline-variant)] mb-2" />
                      No appointments matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Appointment Details Modal */}
      {activeAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-[var(--color-outline-variant)] shadow-2xl relative animate-in scale-in duration-300">
            <h3 className="text-2xl font-bold text-[var(--color-primary)] pb-4 border-b border-[var(--color-outline-variant)]">
              Appointment Details
            </h3>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[var(--color-outline)] block uppercase tracking-wider font-semibold">Patient Name</span>
                  <span className="font-bold text-lg text-[var(--color-primary)] flex items-center gap-2 mt-1">
                    <User className="h-4.5 w-4.5 text-[var(--color-secondary)]" />
                    {activeAppointment.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--color-outline)] block uppercase tracking-wider font-semibold">Contact</span>
                  <span className="font-bold text-lg text-[var(--color-primary)] flex items-center gap-2 mt-1">
                    <Phone className="h-4.5 w-4.5 text-[var(--color-secondary)]" />
                    {activeAppointment.contactNumber}
                  </span>
                  {activeAppointment.email && (
                    <span className="text-sm text-[var(--color-outline)] flex items-center gap-2 mt-1 font-medium">
                      <Mail className="h-4 w-4 text-[var(--color-secondary)]" />
                      {activeAppointment.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-xs text-[var(--color-outline)] block uppercase tracking-wider font-semibold">Department</span>
                  <div className="mt-1">
                    <DeptBadge dept={activeAppointment.department} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[var(--color-outline)] block uppercase tracking-wider font-semibold">OPD Specialist</span>
                  <span className="font-semibold text-base text-[var(--color-primary)] block mt-1">
                    {activeAppointment.doctor}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--color-surface-container)] grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-[var(--color-outline)] block">Appointment Date</span>
                  <span className="font-semibold text-sm text-[var(--color-primary)] flex items-center gap-1.5 mt-1">
                    <Calendar className="h-4 w-4 text-[var(--color-secondary)]" />
                    {activeAppointment.date}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--color-outline)] block">OPD Slot</span>
                  <span className="font-semibold text-sm text-[var(--color-primary)] flex items-center gap-1.5 mt-1">
                    <Clock className="h-4 w-4 text-[var(--color-secondary)]" />
                    {activeAppointment.timeSlot}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[var(--color-outline)] block uppercase tracking-wider font-semibold">Reason for Consultation</span>
                <p className="mt-2 text-sm p-4 rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] italic leading-relaxed">
                  {activeAppointment.reason ? `"${activeAppointment.reason}"` : "No reason provided."}
                </p>
              </div>

              <div className="pt-2 text-2xs text-[var(--color-outline)]">
                Booked online on: {new Date(activeAppointment.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setActiveAppointment(null)}
                className="btn-primary px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  colorClass = "",
  subtext,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  colorClass?: string;
  subtext?: string;
}) {
  return (
    <article className={`rounded-[1.25rem] border p-4 ${colorClass} shadow-[var(--shadow-soft)]`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]/80">
          {title}
        </span>
        <div className="rounded-xl bg-white p-2 shadow-sm border border-black/5">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-black text-[var(--color-primary)]">
          {value}
        </span>
        {subtext && (
          <span className="text-3xs text-[var(--color-outline)] font-medium">
            {subtext}
          </span>
        )}
      </div>
    </article>
  );
}

function DeptBadge({ dept }: { dept: string }) {
  if (dept === "Gastroenterology") {
    return (
      <span className="inline-flex items-center rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-700">
        Gastroenterology
      </span>
    );
  }
  if (dept === "Neurosurgery") {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">
        Neurosurgery
      </span>
    );
  }
  if (dept === "Orthopedics") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
        Orthopedics
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-bold text-purple-700">
      Gynecology
    </span>
  );
}

function LoaderSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
