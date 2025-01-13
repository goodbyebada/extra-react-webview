export default function getPlatform(): string {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window)) {
    return "iOS";
  }
  if (/Windows/i.test(userAgent)) {
    return "Windows";
  }
  if (/Mac/i.test(userAgent)) {
    return "MacOS";
  }
  return "Unknown";
}
