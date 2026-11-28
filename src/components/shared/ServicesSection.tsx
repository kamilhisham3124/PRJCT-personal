import React from "react";
import { PhosphorHardDrives, PhosphorDatabase, PhosphorStack } from "../icons";
import { SurfaceCard } from "./SurfaceCard";

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
      "WCAG 2.2 AA target practices & keyboard operability",
      "Sub-second First Contentful Paint benchmarks",
    ],
  },
];

export function ServicesSection() {
  return (
    <section aria-label="Core Engineering Competencies" className="flex flex-col gap-3 sm:gap-5">
      <div className="pb-2 border-b border-[var(--border-structural)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Core Engineering Competencies</h2>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">Specialized backend and full-stack disciplines with concrete technical deliverables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon;
          return (
            <SurfaceCard
              key={service.title}
              variant="plain"
              className={`flex flex-col justify-between ${idx === 0 ? "border-t-0 pt-0" : "pt-3"} md:pt-0 md:border-t-0`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-fg-accent shrink-0" />
                  <h3 className="text-sm font-semibold text-text-primary">{service.title}</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-2">{service.description}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Technical Scope &amp; Output
                </span>
                <ul className="space-y-1 text-xs text-text-secondary">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-fg-accent font-bold select-none">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SurfaceCard>
          );
        })}
      </div>
    </section>
  );
}
