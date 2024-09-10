/**
  @description Helper function to generate API URL with constructed search and query params.
  @param domain Domain of API
  @param path Path of API, with path param to be replaced in curly braces
  @param pathParams Key-value pair of path param to replace, eg. {foo:bar} replaces /{foo}=>/bar
  @param queryParams Key-value pair of query param to set, eg. {foo:bar} sets ?foo=bar
**/
export const generateUrl = (
  domain: string,
  path: string,
  pathParams: Record<string, string>,
  queryParams: Record<string, string>
): string => {
  const constructedPath = path.replace(/{(\w+)}/g, (_, key) => pathParams[key]);
  try {
    const fullUrl = new URL(constructedPath, domain);
    for (const [query, value] of Object.entries(queryParams)) {
      fullUrl.searchParams.set(query, value);
    }
    return fullUrl.toString();
  } catch (e) {
    // Catches any invalid base URL
    return "";
  }
};
