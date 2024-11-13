import { Http } from '@nativescript/core'

export class ApiService {
    private baseUrl = 'https://api.example.com'

    async getData(): Promise<any> {
        try {
            const response = await Http.request({
                url: `${this.baseUrl}/data`,
                method: 'GET'
            })
            return response.content.toJSON()
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    }
}