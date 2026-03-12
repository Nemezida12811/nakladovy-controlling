export const isElectron = (): boolean => {
  return typeof window !== 'undefined' && 'electron' in window;
};