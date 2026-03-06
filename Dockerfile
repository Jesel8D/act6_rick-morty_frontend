# Usa la imagen oficial Node.js slim (Debian, glibc) para compatibilidad con SWC
FROM node:20-slim AS base
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ─── Fase 1: Dependencias ────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ─── Fase 2: Build ───────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── Fase 3: Runner ──────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

# Crea usuario no-root para seguridad
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

# Copia artefactos del build standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
