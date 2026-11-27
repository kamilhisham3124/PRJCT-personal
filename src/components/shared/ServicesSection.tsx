import React from "react";
import { PhosphorHardDrives, PhosphorDatabase, PhosphorStack } from "../icons";

const SERVICES = [
  {
    title: "REST API Engineering",
    icon: PhosphorHardDrives,
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
    icon: PhosphorDatabase,
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
    icon: PhosphorStack,
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
    <section aria-label="Core Engineering Competencies" className="flex flex-col gap-5">
      <div className="pb-2 border-b border-[var(--border-structural)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Core Engineering Competencies</h2>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Specialized backend and full-stack disciplines with concrete technical deliverables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="linkhunt-card p-3.5 sm:p-5 flex flex-col justify-between hover:shadow-card-hover transition-all"
            >
              <div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent-subtle border border-accent-border flex items-center justify-center text-fg-accent mb-2.5 sm:mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-1 sm:mb-1.5">{service.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-3 sm:mb-4">{service.description}</p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-border-structural">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1.5 sm:mb-2">
                  Technical Scope &amp; Output
                </span>
                <ul className="space-y-1 sm:space-y-1.5 text-xs text-text-secondary">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-fg-accent font-bold select-none">&bull;</span>
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
