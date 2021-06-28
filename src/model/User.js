import { http } from '@/http/http'

export class User {
    static getInfo() {
        return http.post('')
    }
}