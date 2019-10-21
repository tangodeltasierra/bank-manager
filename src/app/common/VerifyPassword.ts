export default interface VerifyPassword {
    kind: String;
    localId: String;
    email: String;
    displayName: String;
    idToken: String;
    registered: boolean;
    refreshToken: String;
    expiresIn: String;
}