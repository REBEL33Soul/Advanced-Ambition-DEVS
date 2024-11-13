import { NavigatedData, Page } from '@nativescript/core'
import { HomeViewModel } from './home-view-model'

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object
    const vm = new HomeViewModel()
    page.bindingContext = vm
    vm.loadData()
}

export function onFeaturesTap() {
    // Navigate to features page
    console.log('Features tapped')
}

export function onSettingsTap() {
    // Navigate to settings page
    console.log('Settings tapped')
}

export function onAboutTap() {
    // Navigate to about page
    console.log('About tapped')
}