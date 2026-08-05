Import type { CapacitorConfig } from '@capacitor/cli'

Const config: CapacitorConfig = {
  appId: 'com.regain.focusshield',
  appName: 'ReGain',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
    backgroundColor: '#0a0e1a',
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
}

Export default config
