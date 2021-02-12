interface Navigator {
  standalone: boolean;

  getInstalledRelatedApps: () => Promise<
    Array<{ id: string; platform: string; url: string }>
  >;
}

interface Window {
  requestIdleCallback: (
    callback: () => void,
    options?: { timeout?: number }
  ) => number;

  cancelIdleCallback: (id: number) => void;
}
