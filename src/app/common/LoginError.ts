export default interface LoginError {
  code: number;
  message: string;
  errors: Error[];
}
