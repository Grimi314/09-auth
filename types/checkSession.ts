export interface CheckSessionRequest {
    success: boolean;
}

export interface RefreshSessionResponse {
  accessToken: string;
  refreshToken: string;
}