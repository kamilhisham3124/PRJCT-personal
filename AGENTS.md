# AGENTS.md — Repository Guidance and Architecture Boundaries

## Master Build Directive

### Section 5.0: Boundary Isolation
All components, routes, and loaders must respect the 3-layer architecture defined in DOC-06. Build-time materials are isolated from visitor-facing bundles.

RULE: The .context/ directory and every file within it are build-time, repository-internal planning material only. No file inside .context/ may ever be imported by application code, copied into public/, referenced by a content loader's source path, or included in any build output. Any pull request that introduces such a reference fails CI automatically. This rule has no exceptions and requires no amendment process to enforce, since no legitimate feature requirement ever depends on serving specification documents to a visitor.
