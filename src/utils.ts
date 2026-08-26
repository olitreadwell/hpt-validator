import { ErrorObject } from "ajv";
import { ValidationError } from "./errors/ValidationError.js";

export function addItemsWithLimit<T>(
  newItems: T[],
  mainList: T[],
  maxItems = 0
) {
  if (maxItems > 0 && mainList.length + newItems.length > maxItems) {
    newItems = newItems.slice(0, maxItems - mainList.length);
  }
  mainList.push(...newItems);
  return mainList.length;
}

export function errorObjectToValidationError(
  error: ErrorObject
): ValidationError {
  return new ValidationError(error.instancePath, error.message ?? "").withField(
    error.instancePath.split("/").pop() ?? ""
  );
}

export function errorObjectToValidationAlert(
  error: ErrorObject
): ValidationError {
  return new ValidationError(
    error.instancePath,
    (error.schema as any)?.["$message"] ?? error.message ?? ""
  ).withField(error.instancePath.split("/").pop() ?? "");
}

export function removeBOM(chunk: string): string {
  // strip utf-8 BOM: see https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
  if (chunk.charCodeAt(0) === 0xfeff) {
    return chunk.slice(1);
  }
  return chunk;
}
