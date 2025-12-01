export const MALICIOUS_SCRIPT_PATTERNS = [
  /node\s+setup_bun\.js/i,
  /node\s+bun_environment\.js/i,
  /node\s+bundle\.js/i,
  /trufflehog/i,
];

export const SUSPICIOUS_NAME_PATTERNS = [
  /shai[-_]?hulud/i,
  /sha1[-_]?hulud/i,
  /bun[-_]?environment/i,
  /setup[-_]?bun/i,
];
