/* eslint-disable */
import { TRPCError } from "@trpc/server";

/**
@description wraps function in a try catch and throws a 500 TRPC Error, use in repository.
 **/

export function ErrorBoundary(): MethodDecorator {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: Parameters<typeof originalMethod>
    ): Promise<ReturnType<typeof originalMethod>> {
      try {
        return await originalMethod.apply(this, args);
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e instanceof Error ? e.message : "An unknown error occurred",
          cause: e,
        });
      }
    };
  };
}
