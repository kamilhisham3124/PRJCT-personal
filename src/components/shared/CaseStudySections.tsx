import React from "react";
import { CodeSnippet } from "../client/CodeSnippet";
import { DataTable } from "./DataTable";
import { Accordion } from "../client/Accordion";
import { Tooltip } from "../client/Tooltip";
import type { CaseStudyContent } from "../../lib/validators/contentValidator";

export function CaseStudySections({ study }: { study: CaseStudyContent }) {
  const sampleCode =
    study.slug === "employee-task-management"
      ? `@action(detail=True, methods=['post'], permission_classes=[IsAdminUser])\ndef assign_task(self, request, pk=None):\n    task = self.get_object()\n    serializer = TaskAssignmentSerializer(data=request.data)\n    serializer.is_valid(raise_exception=True)\n    task.assigned_to = serializer.validated_data['user']\n    task.save(update_fields=['assigned_to', 'updated_at'])\n    return Response(TaskDetailSerializer(task).data)`
      : `def create_order(request):\n    with transaction.atomic():\n        cart = get_cart_or_404(request.user)\n        order = Order.objects.create(user=request.user, total=cart.total)\n        for item in cart.items.select_for_update():\n            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)\n        cart.clear()\n    return redirect('order_confirmation', order_id=order.id)`;

  const specRows = [
    ["Runtime Substrate", "Python 3.12 / Django 5.x", "Deterministic environment"],
    ["Persistence Layer", "PostgreSQL / SQLite", "ACID compliant transactions"],
    ["Access Governance", "Role-Based Permissions", "Enforced at model & view layers"],
    ["Test Coverage", "Unit & API Integration", "100% endpoint assertions passing"],
  ];

  const accordionItems = [
    {
      id: "methodology",
      title: "Architecture & Verification Protocol",
      content: (
        <p>
          Engineered using strict test-driven contracts. Every endpoint adheres to uniform JSON response envelopes and validates inputs against typed schemas before mutating database state.
        </p>
      ),
    },
    {
      id: "schema-integrity",
      title: "Relational Schema Guarantees",
      content: (
        <p>
          Enforces Third Normal Form (3NF) with explicit foreign key cascading rules, composite indexes on high-cardinality query paths, and atomic database transaction blocks.
        </p>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="linkhunt-card p-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
          01. Context &amp; Problem
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.problem_statement}</p>
      </section>

      <section className="linkhunt-card p-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
          02. Architecture &amp; Implementation
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{study.architecture_overview}</p>
        <CodeSnippet code={sampleCode} language="python" filename={`${study.slug}_service.py`} />
      </section>

      <section className="linkhunt-card p-6">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-structural)]">
          03. Database Schema &amp; Data Integrity
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-2">{study.database_design}</p>
        <p className="text-xs text-[var(--text-secondary)] mb-3">
          Architecture leverages <Tooltip text="Role-Based Access Control">RBAC</Tooltip> and <Tooltip text="Third Normal Form">3NF</Tooltip> normalization.
        </p>
        <DataTable headers={["System Layer", "Specification", "Guarantee"]} rows={specRows} caption="Verified Technical Architecture Specifications" />
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Deep-Dive Methodologies</h3>
        <Accordion items={accordionItems} />
      </section>
    </div>
  );
}
