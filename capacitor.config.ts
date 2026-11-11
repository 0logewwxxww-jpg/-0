import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.imaminkadhim.school',
  appName: 'مدرسة الإمامين الكاظمين',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: { allowMixedContent: false },
  plugins: {
    StatusBar: { overlaysWebView: false, backgroundColor: '#102d66', style: 'LIGHT' }
  }
};
export default config;