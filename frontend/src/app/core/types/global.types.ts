export type NewsMessageBullet = {
    message: string;
    createdAt: Date;
    type: 'success' | 'danger' | 'warning' | 'info';
}
