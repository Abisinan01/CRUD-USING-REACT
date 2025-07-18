export interface LoginResponse{
    success: boolean;
    message: string;
    user?: {
        id: string;
        username: string;
        email: string;
        profile?: string;
    }
}