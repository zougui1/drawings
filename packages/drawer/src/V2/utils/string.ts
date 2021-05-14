export const withLocation = (message: string, location: string | undefined): string => {
  return location
    ? `${message} at ${location}`
    : message;
}
