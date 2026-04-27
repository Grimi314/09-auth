export interface CheckSessionResponse {
    success: boolean;
}

export interface RefreshSessionResponse {
  accessToken: string;
  refreshToken: string;
}