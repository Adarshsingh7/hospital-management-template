"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  HeartPulse,
  Info,
  Phone,
  ShieldPlus,
  Stethoscope,
  Loader2,
  Calendar,
  Briefcase,
  User,
  PartyPopper,
  Mail,
} from "lucide-react";
import { bookingSteps } from "@/lib/site-data";

interface AppointmentData {
  _id?: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  reason?: string;
  createdAt?: string;
}

interface DateItem {
  date: Date;
  formatted: string;
  label: string;
  isPast: boolean;
}

interface DepartmentData {
  _id: string;
  name: string;
  icon?: string;
  createdAt?: string;
}

interface DoctorData {
  _id: string;
  name: string;
  department: string;
  specialty: string;
  subspecialty?: string;
  availability?: string;
  rating?: string;
  image?: string;
  opdDays: number[];
  startTime: string;
  endTime: string;
}

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  // Database Data States
  const [dbDepartments, setDbDepartments] = useState<DepartmentData[]>([]);
  const [dbDoctors, setDbDoctors] = useState<DoctorData[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Form State
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<AppointmentData | null>(null);

  // Dynamic Available Dates State
  const [availableDates, setAvailableDates] = useState<DateItem[]>([]);

  // Fetch departments & doctors from backend database
  useEffect(() => {
    const loadData = async () => {
      try {
        setDbLoading(true);
        const [deptsRes, docsRes] = await Promise.all([
          fetch("/api/departments"),
          fetch("/api/doctors"),
        ]);
        const deptsData = await deptsRes.json();
        const docsData = await docsRes.json();
        if (deptsRes.ok && deptsData.success) {
          setDbDepartments(deptsData.departments);
        }
        if (docsRes.ok && docsData.success) {
          setDbDoctors(docsData.doctors);
        }
      } catch (err) {
        console.error("Failed to load departments/doctors:", err);
      } finally {
        setDbLoading(false);
      }
    };
    loadData();
  }, []);

  // Helper to parse "11:00 AM" into 24h hours/minutes
  const parseTimeString = (timeStr: string): { hour: number; minute: number } => {
    const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return { hour: 9, minute: 0 };
    let hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return { hour, minute };
  };

  // Generate 30-minute slots dynamically based on active doctor's timings
  const getTimeSlots = (): { time: string; disabled: boolean }[] => {
    if (!selectedDoctor) return [];
    const docObj = dbDoctors.find((d) => d.name === selectedDoctor);
    if (!docObj) return [];

    const start = parseTimeString(docObj.startTime);
    const end = parseTimeString(docObj.endTime);

    const startMinutes = start.hour * 60 + start.minute;
    const endMinutes = end.hour * 60 + end.minute;

    const slots = [];
    let currentMinutes = startMinutes;

    const now = new Date();
    const todayFormatted = now.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const isSelectedDateToday = selectedDateStr === todayFormatted;
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    const currentTotalMinutes = nowHour * 60 + nowMinute;

    while (currentMinutes < endMinutes) {
      const hr = Math.floor(currentMinutes / 60);
      const min = currentMinutes % 60;

      const ampm = hr >= 12 ? "PM" : "AM";
      const displayHour = hr % 12 === 0 ? 12 : hr % 12;
      const displayMin = min < 10 ? `0${min}` : min;
      const timeString = `${displayHour}:${displayMin} ${ampm}`;

      const isPastSlot = isSelectedDateToday && currentMinutes <= currentTotalMinutes;

      slots.push({
        time: timeString,
        disabled: isPastSlot,
      });

      currentMinutes += 30;
    }
    return slots;
  };

  // Generate next 30 days filtered by doctor's opdDays
  useEffect(() => {
    if (!selectedDoctor) return;
    const docObj = dbDoctors.find((d) => d.name === selectedDoctor);
    if (!docObj) return;

    const activeOpdDays = docObj.opdDays || [];
    const dates: DateItem[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();

      if (activeOpdDays.includes(dayOfWeek)) {
        const formatted = d.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const label = d.toLocaleDateString("en-US", { weekday: "short" });
        dates.push({
          date: d,
          formatted,
          label,
          isPast: false,
        });
      }
    }
    setAvailableDates(dates);

    if (dates.length > 0) {
      const stillValid = dates.some((d) => d.formatted === selectedDateStr);
      if (!stillValid) {
        setSelectedDateStr(dates[0].formatted);
        setSelectedTimeSlot("");
      }
    } else {
      setSelectedDateStr("");
      setSelectedTimeSlot("");
    }
  }, [selectedDoctor, dbDoctors, selectedDateStr]);

  // Helper to check if step is allowed to be visited
  const canNavigateToStep = (index: number) => {
    if (index === 0) return true;
    if (index === 1) return selectedDepartment !== "";
    if (index === 2) return selectedDepartment !== "" && selectedDoctor !== "";
    if (index === 3) return selectedDepartment !== "" && selectedDoctor !== "" && selectedDateStr !== "" && selectedTimeSlot !== "";
    return false;
  };

  // Filter doctors based on selected department
  const filteredDoctors = dbDoctors.filter(
    (doc) => doc.department === selectedDepartment
  );

  // Reset selected doctor when department changes
  useEffect(() => {
    setSelectedDoctor("");
  }, [selectedDepartment]);

  // Handle department select
  const handleDepartmentSelect = (deptName: string) => {
    setSelectedDepartment(deptName);
    if (currentStep === 0) setCurrentStep(1);
  };

  // Handle doctor select
  const handleDoctorSelect = (docName: string) => {
    setSelectedDoctor(docName);
    if (currentStep === 1) setCurrentStep(2);
  };

  // Handle slot select
  const handleSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  // Handle date select
  const handleDateSelect = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    setSelectedTimeSlot(""); // Reset slot choice when date changes
  };

  // Submit appointment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contactNumber.trim()) {
      setError("Please enter your name and contact number.");
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          contactNumber,
          email: email.trim(),
          department: selectedDepartment,
          doctor: selectedDoctor,
          date: selectedDateStr,
          timeSlot: selectedTimeSlot,
          reason,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessData(data.appointment);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Network error. Please make sure MongoDB is running and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (dbLoading) {
    return (
      <div className="flex items-center justify-center p-12 min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-[var(--color-primary)] animate-spin mx-auto" />
          <p className="mt-4 text-sm font-semibold text-[var(--color-primary)]">Loading booking information...</p>
        </div>
      </div>
    );
  }

  // Success view
  if (successData) {
    return (
      <div className="surface-card p-8 md:p-12 max-w-2xl mx-auto text-center border-t-4 border-[var(--color-secondary)] animate-in fade-in-50 duration-500">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
          <PartyPopper className="h-10 w-10 animate-bounce" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-[var(--color-primary)]">
          Appointment Confirmed!
        </h2>
        <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">
          Your OPD consultation slot has been reserved successfully in our system.
        </p>

        {/* Receipt Card */}
        <div className="mt-8 rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-6 text-left space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[var(--color-outline-variant)]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-outline)]">
              Appointment Details
            </span>
            <span className="text-xs px-2.5 py-1 bg-[var(--color-primary-fixed)] text-[var(--color-primary)] font-bold rounded-full">
              Confirmed
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--color-outline)] block">Patient Name</span>
                <span className="font-semibold text-base text-[var(--color-primary)]">{successData.fullName}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--color-outline)] block">Contact Number</span>
                <span className="font-semibold text-base text-[var(--color-primary)]">{successData.contactNumber}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--color-outline)] block">Specialty & Doctor</span>
                <span className="font-semibold text-base text-[var(--color-primary)]">
                  {successData.department} - {successData.doctor}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[var(--color-outline)] block">OPD Date & Time</span>
                <span className="font-semibold text-base text-[var(--color-primary)] flex items-center gap-1.5">
                  {successData.date} @ {successData.timeSlot}
                </span>
              </div>
            </div>

            {successData.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[var(--color-outline)] block">Email Address</span>
                  <span className="font-semibold text-base text-[var(--color-primary)]">{successData.email}</span>
                </div>
              </div>
            )}
          </div>

          {successData.reason && (
            <div className="pt-3 border-t border-[var(--color-outline-variant)]">
              <span className="text-xs text-[var(--color-outline)] block">Reason for Visit</span>
              <p className="mt-1 text-sm text-[var(--color-on-surface-variant)] italic">
                &quot;{successData.reason}&quot;
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setSuccessData(null);
              setFullName("");
              setContactNumber("");
              setEmail("");
              setReason("");
              setCurrentStep(0);
            }}
            className="btn-primary justify-center px-6 py-3 cursor-pointer"
          >
            Book Another Appointment
          </button>
          <Link href="/" className="btn-outline justify-center px-6 py-3 cursor-pointer">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const generatedTimeSlots = getTimeSlots();

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar Progress */}
      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <div className="surface-card p-6">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Booking Progress
          </h2>
          <div className="mt-6 space-y-5">
            {bookingSteps.map((step, index) => {
              const active = index === currentStep;
              const completed = index < currentStep;
              const clickable = canNavigateToStep(index);
              return (
                <button
                  key={step}
                  disabled={!clickable}
                  onClick={() => {
                    if (clickable) {
                      setCurrentStep(index);
                    }
                  }}
                  className={`flex items-center gap-4 text-left w-full transition ${
                    clickable ? "hover:opacity-85 cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                      completed
                        ? "border-[var(--color-secondary)] bg-[var(--color-secondary)] text-white"
                        : active
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                          : "border-[var(--color-outline-variant)] text-[var(--color-outline)]"
                    }`}
                  >
                    {completed ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <span
                    className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                      active
                        ? "text-[var(--color-primary)] font-bold"
                        : completed
                          ? "text-[var(--color-secondary)]"
                          : "text-[var(--color-outline)]"
                    }`}
                  >
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="surface-card bg-[var(--color-surface-container)] p-6">
          <h3 className="text-xl font-semibold text-[var(--color-primary)]">
            Need Help?
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-on-surface-variant)]">
            Our clinic support team is available during OPD hours for assistance.
          </p>
          <a className="btn-secondary mt-6 w-full justify-center" href="tel:+919450987101">
            <Phone className="h-5 w-5" />
            Call Support
          </a>
        </div>
      </aside>

      {/* Steps Content */}
      <div className="space-y-8">
        {/* Step 1: Department */}
        {currentStep === 0 && (
          <section className="surface-card p-6 md:p-8 animate-in fade-in duration-200">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
                Step 1: Select Department
              </h2>
              <span className="rounded-full bg-[var(--color-surface-container)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-on-surface-variant)]">
                Required
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dbDepartments.map((dept) => {
                const isSelected = selectedDepartment === dept.name;
                return (
                  <button
                    key={dept.name}
                    type="button"
                    onClick={() => handleDepartmentSelect(dept.name)}
                    className={`rounded-[1.25rem] border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] cursor-pointer ${
                      isSelected
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-fixed)]"
                        : "border-[var(--color-outline-variant)] bg-white"
                    }`}
                  >
                    <div className="inline-flex rounded-2xl bg-[var(--color-secondary-container)] p-3 text-[var(--color-secondary)]">
                      <DepartmentIcon name={dept.name} />
                    </div>
                    <p className="mt-4 text-base font-semibold text-[var(--color-primary)]">
                      {dept.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Step 2: Choose Specialist */}
        {currentStep === 1 && (
          <section className="surface-card p-6 md:p-8 animate-in fade-in duration-200">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
                Step 2: Choose Your Specialist
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredDoctors.map((doc) => {
                const isSelected = selectedDoctor === doc.name;
                return (
                  <article
                    key={doc.name}
                    onClick={() => handleDoctorSelect(doc.name)}
                    className={`surface-card relative flex gap-4 p-4 cursor-pointer transition-all hover:border-[var(--color-secondary)] ${
                      isSelected
                        ? "border-[var(--color-secondary)] bg-[color-mix(in_oklab,var(--color-secondary-container)_14%,white)]"
                        : ""
                    }`}
                  >
                    <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--color-primary)] shadow-[var(--shadow-soft)]">
                      {doc.rating}
                    </div>
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1rem] bg-[var(--color-surface-container)]">
                      {doc.image && (
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                        {doc.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-secondary)]">
                        {doc.specialty}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-on-surface-variant)] italic">
                        {doc.subspecialty}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded bg-[var(--color-surface-container)] text-[var(--color-tertiary)]">
                        <Check className="h-3.5 w-3.5" />
                        {doc.availability || `${doc.startTime} - ${doc.endTime}`}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="btn-outline cursor-pointer"
              >
                Back
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Date & Time */}
        {currentStep === 2 && (
          <section className="surface-card p-6 md:p-8 animate-in fade-in duration-200">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
                Step 3: Select Date & Time
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Date Selection */}
              <div className="rounded-[1.5rem] bg-[var(--color-surface-container)] p-6">
                <div className="text-lg font-semibold text-[var(--color-on-surface)] mb-4">
                  Select a Consultation Date
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDateStr === item.formatted;
                    const dateObj = item.date;
                    const dayNum = dateObj.getDate();
                    const monthShort = dateObj.toLocaleDateString("en-US", { month: "short" });

                    return (
                      <button
                        key={item.formatted}
                        type="button"
                        onClick={() => handleDateSelect(item.formatted)}
                        className={`rounded-xl p-3 flex flex-col items-center justify-center transition border cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-primary)] font-semibold text-white border-[var(--color-primary)]"
                            : "bg-white text-[var(--color-on-surface)] border-[var(--color-outline-variant)] hover:border-[var(--color-primary)]"
                        }`}
                      >
                        <span className={`text-xs ${isSelected ? "text-white/80" : "text-[var(--color-outline)]"}`}>
                          {item.label}
                        </span>
                        <span className="text-xl font-bold mt-1">
                          {dayNum}
                        </span>
                        <span className={`text-2xs uppercase tracking-wider mt-0.5 ${isSelected ? "text-white/80" : "text-[var(--color-outline)]"}`}>
                          {monthShort}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="text-lg font-semibold text-[var(--color-on-surface)]">
                  Available Slots for {selectedDateStr.split(",")[0]}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                  {generatedTimeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={slot.disabled}
                        onClick={() => handleSlotSelect(slot.time)}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
                          slot.disabled
                            ? "cursor-not-allowed bg-[var(--color-surface-container-highest)] text-[var(--color-outline)] line-through opacity-50"
                            : isSelected
                              ? "border-2 border-[var(--color-secondary)] bg-[color-mix(in_oklab,var(--color-secondary-container)_24%,white)] text-[var(--color-primary)]"
                              : "border border-[var(--color-outline-variant)] bg-white text-[var(--color-on-surface)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary-container)]/25"
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn-outline cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!selectedDateStr || !selectedTimeSlot}
                onClick={() => {
                  if (selectedDateStr && selectedTimeSlot) {
                    setCurrentStep(3);
                  }
                }}
                className={`btn-secondary cursor-pointer ${(!selectedDateStr || !selectedTimeSlot) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {/* Step 4: Patient Details */}
        {currentStep === 3 && (
          <section className="surface-card p-6 md:p-8 animate-in fade-in duration-200">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
                Step 4: Patient Details
              </h2>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-field mt-2"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="contactNumber">Contact Number</label>
                  <input
                    id="contactNumber"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="form-field mt-2"
                    placeholder="+91 99999-99999"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label" htmlFor="email">Email Address (Optional, for confirmation mail)</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-field mt-2"
                    placeholder="patient@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label" htmlFor="reason">
                    Reason for Visit (Optional)
                  </label>
                  <textarea
                    id="reason"
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    className="form-field mt-2 min-h-28 resize-y"
                  />
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 space-y-2 text-sm text-[var(--color-primary)]">
                <h4 className="font-bold border-b border-[var(--color-outline-variant)] pb-1.5 mb-2 uppercase text-2xs tracking-wider text-[var(--color-outline)]">
                  Booking Summary
                </h4>
                <div className="flex justify-between">
                  <span className="text-[var(--color-outline)]">Department:</span>
                  <span className="font-semibold">{selectedDepartment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-outline)]">Specialist:</span>
                  <span className="font-semibold">{selectedDoctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-outline)]">Schedule:</span>
                  <span className="font-semibold">{selectedDateStr} @ {selectedTimeSlot}</span>
                </div>
              </div>

              <div className="flex gap-3 rounded-[1.25rem] bg-[var(--color-surface-container-high)] p-4 text-sm leading-7 text-[var(--color-on-surface-variant)]">
                <Info className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <p>
                  By clicking confirm, you agree to our patient
                  confidentiality policy. An SMS confirmation will be sent to
                  your mobile number.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-4 border-t border-[var(--color-outline-variant)] pt-6 md:flex-row">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-outline cursor-pointer"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-danger flex items-center justify-center gap-2 min-w-[180px] cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Confirm Appointment"
                  )}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}

function DepartmentIcon({ name }: { name: string }) {
  const lowercase = name.toLowerCase();
  if (lowercase.includes("gastro")) return <HeartPulse className="h-6 w-6" />;
  if (lowercase.includes("neuro")) return <ShieldPlus className="h-6 w-6" />;
  if (lowercase.includes("ortho")) return <Stethoscope className="h-6 w-6" />;
  return <CalendarDays className="h-6 w-6" />;
}
