export interface Jwt {
    token: {
        token: string;
        expiresIn: number|string;
    },
    renewalToken: {
        renewalToken: string;
        renewalExpiresIn: number|string;
    },
    message?: string|null;
}
