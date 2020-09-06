interface Navigator {
  standalone: boolean;

  getInstalledRelatedApps: () => Promise<
    Array<{ id: string; platform: string; url: string }>
  >;
}
