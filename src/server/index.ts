import "server-only";

export { prisma, getNeonSql } from "./config/db";
export {
  CMS_CACHE_TAGS,
  revalidateCmsDomains,
  revalidateAdminPaths,
  type CmsCacheDomain,
} from "./config/cache";
export {
  extractFieldErrors,
  isTransientDatabaseError,
  toSafeMutationError,
  type ActionResult,
} from "./config/result";

export {
  getCurrentUser,
  requireUser,
  requirePermission,
  authorizeAction,
  authorizeApi,
  createUserSession,
  destroyUserSession,
  type AuthenticatedUser,
} from "./security/auth";
export {
  PERMISSIONS,
  hasPermission,
  type Permission,
} from "./security/permissions";
export {
  runProtectedAction,
  assertPublishPermission,
  type ProtectedActionContext,
  type ProtectedActionOptions,
} from "./security/action-guard";
export { recordAuditLog, scrubAuditSummary } from "./security/audit";
export {
  getRequestIpHash,
  isRateLimited,
  recordRateLimitHit,
  clearRateLimit,
} from "./security/rate-limit";
export {
  DatabaseTimeoutError,
  withServerTimeout,
  verifySameOriginMutation,
} from "./security/csrf";
