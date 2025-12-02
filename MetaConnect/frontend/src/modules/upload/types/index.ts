export interface UploadResponse {
  success: boolean;
  message: string;
  url: string;
  publicId: string;
  originalName: string;
  size: number;
  format: string;
}

export interface UploadError {
  success: false;
  message: string;
  error: string;
}
