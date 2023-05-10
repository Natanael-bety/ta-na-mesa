export interface UsuarioPayload {
  sub: string;
  nome: string;
  email: string;
  senha: string;
  iat?: number;
  exp?: number;
}
