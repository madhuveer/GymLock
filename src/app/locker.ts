export interface Locker {
    lockerId: number;
    status: string;   //free,busy,next
    msg: string;   //free,busy,will be the next reserved one

}
