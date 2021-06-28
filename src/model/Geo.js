import { http } from '@/http/http'

export class Geo {
    static getGeoList(data) {
        return http.post('/', data)
    }
}