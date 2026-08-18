/**
 * parseAccountStatus
 *
 * Helper موحّد لقراءة حالة الحساب بدقة مهما كانت صيغة الباك إند:
 * - boolean: true / false
 * - number: 1 / 0
 * - string: "1" / "0", "true" / "false", "active" / "disabled", "enabled" / "inactive"
 */
export function parseAccountStatus(entity: any): boolean {
  if (!entity) return false;

  const val = entity.account_status ?? entity.is_active ?? entity.status;

  if (
    val === true ||
    val === 1 ||
    val === "1" ||
    val === "true" ||
    val === "active" ||
    val === "enabled"
  ) {
    return true;
  }

  if (
    val === false ||
    val === 0 ||
    val === "0" ||
    val === "false" ||
    val === "disabled" ||
    val === "inactive"
  ) {
    return false;
  }

  return Boolean(val);
}

export default parseAccountStatus;
