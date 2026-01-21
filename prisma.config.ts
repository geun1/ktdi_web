import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // 마이그레이션 시 직접 연결 사용 (pgbouncer 미지원)
    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
