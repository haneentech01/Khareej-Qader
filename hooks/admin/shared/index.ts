/**
 * كل hook هنا مسؤول عن شيء واحد فقط (SRP):
 *  - useEntityList            → جلب البيانات فقط
 *  - useFilteredEntities      → الفلترة + البحث فقط
 *  - useToggleAccountStatus   → الـ mutation فقط
 *  - useEntityManagement      → orchestrator يجمع الثلاثة
 */
export { useEntityList } from "./useEntityList";

export { useFilteredEntities } from "./useFilteredEntities";
export type { StatusFilter } from "./useFilteredEntities";

export { useToggleAccountStatus } from "./useToggleAccountStatus";

export { useEntityManagement } from "./useEntityManagement";

export { parseAccountStatus } from "./statusUtils";
