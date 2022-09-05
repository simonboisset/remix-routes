export default function stripFileExtension(file: string) {
  return file?.replace(/\.[a-z0-9]+$/i, '');
}
