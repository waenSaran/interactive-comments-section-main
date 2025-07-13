const avatars = import.meta.glob('/src/assets/images/avatars/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

/**
 * Resolves the avatar image path from a user-provided image path.
 * 
 * Example input: "/images/avatars/image-ramsesmiron.png"
 */
export function getAvatar(imagePath: string): string {
  const filename = imagePath.split('/').pop(); // e.g., "image-ramsesmiron.png"
  const fullKey = `/src/assets/images/avatars/${filename}`;
  return avatars[fullKey] ?? ''; // returns the imported image URL or undefined
}
