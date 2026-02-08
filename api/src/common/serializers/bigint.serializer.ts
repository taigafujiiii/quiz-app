export function serializeBigInt<T>(value: T): T {
  // JSON.parse returns any; we intentionally coerce for transport-safe payloads.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(
    JSON.stringify(value, (_key, v) => (typeof v === 'bigint' ? v.toString() : v)),
  ) as T;
}
