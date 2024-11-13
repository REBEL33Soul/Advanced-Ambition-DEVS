import { z } from 'zod'

export const AppStoreCompliance = {
  // App Store specific requirements
  contentRating: 'Everyone',
  privacyDetails: {
    dataCollection: ['Usage Data', 'Device Information'],
    dataSecurity: 'Industry Standard Encryption',
    dataSharing: 'No Third Party Sharing'
  },
  
  // Required capabilities
  requiredDeviceCapabilities: [
    'arm64',
    'metal'
  ],
  
  // App Store specific metadata
  appStoreMetadata: {
    category: 'Developer Tools',
    subcategory: 'Development',
    contentAdvisory: 'No age-restricted content'
  }
}

export const PlayStoreCompliance = {
  // Google Play specific requirements
  targetSDK: 33,
  minSDK: 26,
  
  contentRating: {
    ESRB: 'Everyone',
    PEGI: '3',
    googlePlay: 'Everyone'
  },
  
  // Play Store specific metadata
  playStoreMetadata: {
    category: 'Development',
    contentRating: 'Everyone',
    privacyPolicy: 'https://advancedambition.dev/privacy'
  }
}