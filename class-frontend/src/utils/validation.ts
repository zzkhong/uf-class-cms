export const validateAlphaSymbolField =
  (fieldName: string, maxLength: number) => (_: unknown, value: string) => {
    if (!value || value.trim().length === 0) {
      return Promise.reject(new Error(`${fieldName} cannot be empty`));
    }

    if (value.trim().length > maxLength) {
      return Promise.reject(new Error(`${fieldName} is too long`));
    }

    if (!/^[A-Za-z0-9\s'-]+$/.test(value)) {
      return Promise.reject(
        new Error(
          `${fieldName} can only contain letters, numbers, spaces, apostrophes, and hyphens`,
        ),
      );
    }

    return Promise.resolve();
  };
