export const convertFileToBase64 = (file: File): Promise<string> => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = err => reject(err);
});
