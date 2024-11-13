import { Observable } from '@nativescript/core'
import { ApiService } from '../../services/api.service'

export class HomeViewModel extends Observable {
    private apiService: ApiService

    constructor() {
        super()
        this.apiService = new ApiService()
    }

    async loadData() {
        try {
            const data = await this.apiService.getData()
            this.set('data', data)
        } catch (error) {
            console.error('Failed to load data:', error)
        }
    }
}