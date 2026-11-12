import React from "react";
import { Server, Database, Layers } from "lucide-react";

const SERVICES = [
  {
    title: "REST API Engineering",
    icon: Server,
    description: "Designing high-throughput, deterministic backend APIs with predictable contracts and robust security.",
    deliverables: [
      "OpenAPI 3.0 schemas & typed contracts",
      "Role-Based Access Control (RBAC) middleware",
      "Standardized JSON error envelopes & logging",
      "Comprehensive test suites & Postman collections",
    ],
  },
  {
    title: "Relational Database Architecture",
    icon: Database,
    description: "Engineering normalized SQL schemas that prevent data corruption and guarantee transactional consistency.",
    deliverables: [
      "3NF normalized database schema definitions",
      "Deterministic database migration scripts",
      "Constraint enforcement & foreign key cascading",
      "Query indexing & execution plan optimization",
    ],
  },
  {
    title: "Full-Stack Web Delivery",
    icon: Layers,
    description: "Building production-grade web interfaces with zero unnecessary dependencies and strict performance budgets.",
    deliverables: [
      "Next.js React Server Component pipelines",
      "Type-safe form actions & Zod runtime validation",
      "WCAG 2.2 Level AA accessibility compliance",
      "Sub-second First Contentful Paint benchmarks",
    ],
  },
];

export function ServicesSection() {
  return (
    <section aria-label="Services and Capabilities" className="flex flex-col gap-5">
      <div className="pb-2 border-b border-[var(--border-structural)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Services &amp; Capabilities</h2>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Engineering disciplines and concrete project deliverables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="linkhunt-card p-5 flex flex-col justify-between hover:shadow-card-hover transition-all"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-structural)] flex items-center justify-center text-[var(--text-primary)] mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{service.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{service.description}</p>
              </div>

              <div className="pt-3 border-t border-[var(--border-structural)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-2">
                  Concrete Deliverables
                </span>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold select-none">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
