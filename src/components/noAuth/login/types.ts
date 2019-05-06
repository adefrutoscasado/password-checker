export interface SessionState {
  loggedIn: boolean;
  loginError: string;
  userId: number | null;
  access_token: string | null;
  refresh_token: string | null;
  username: string;
}