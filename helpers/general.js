export function sanitize_number(string) {
  return string.replace(/[^0-9]/g,'')
}
