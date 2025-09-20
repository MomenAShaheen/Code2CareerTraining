export function expectWithoutProperties(
  obj: any,
  propertiesToIgnore: string[]
): jest.JestMatchers<any> {
  const filteredObj = deepCloneAndRemove(obj, propertiesToIgnore);
  return expect(filteredObj);
}

// Helper function to deep clone and remove properties
function deepCloneAndRemove(obj: any, propertiesToIgnore: string[]): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCloneAndRemove(item, propertiesToIgnore));
  }

  const cloned = { ...obj };

  // Remove properties using dot notation
  propertiesToIgnore.forEach((propPath) => {
    if (propPath.includes(".")) {
      // Handle nested properties
      removeNestedProperty(cloned, propPath);
    } else {
      // Handle top-level properties
      if (propPath in cloned) {
        delete cloned[propPath];
      }
    }
  });

  // Recursively process all remaining properties
  for (const key in cloned) {
    if (typeof cloned[key] === "object" && cloned[key] !== null) {
      cloned[key] = deepCloneAndRemove(cloned[key], propertiesToIgnore);
    }
  }

  return cloned;
}

// Helper to remove nested properties using dot notation
function removeNestedProperty(obj: any, path: string): void {
  const parts = path.split(".");
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]!] === undefined || current[parts[i]!] === null) {
      return; // Path doesn't exist
    }
    current = current[parts[i]!];
  }

  const finalKey = parts[parts.length - 1]!;
  if (current[finalKey] !== undefined) {
    delete current[finalKey];
  }
}
