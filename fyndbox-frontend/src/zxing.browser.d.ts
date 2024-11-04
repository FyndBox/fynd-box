declare module '@zxing/browser' {
  export interface VideoInputDevice {
    deviceId: string;
    label: string;
  }

  export class BrowserQRCodeReader {
    constructor(hints?: any, timeBetweenScansMillis?: number);

    decodeFromVideoDevice(
      deviceId: string | null,
      videoElement: HTMLVideoElement,
      callbackFn: (result: { getText(): string } | null, error: any) => void,
    ): Promise<DecodeControls>;

    static listVideoInputDevices(): Promise<VideoInputDevice[]>;

    reset(): void;
  }

  export interface DecodeControls {
    stop(): void;
  }
}
