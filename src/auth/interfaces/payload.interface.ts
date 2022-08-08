interface Payload {
  userId: string; // uuid v4
  login: string;
}

interface OldPayload {
  userId: string;
  login: string;
  iat: number;
  exp: number;
}
