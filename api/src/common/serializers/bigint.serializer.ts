export function serializeBigInt<T>(value: T): T {
  const serialized: unknown = JSON.parse(
    JSON.stringify(value, (_key, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );
  return serialized as T;
}
