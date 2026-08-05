# ReGain – Focus Shield

This package was reconstructed from the supplied ReGain source document.

## Build
```bash
npm install
npm run build
```

The Android folder contains the textual Gradle/Capacitor/native sources recovered
from the document. The supplied document explicitly says several binary Android
assets (including `gradle-wrapper.jar` and PNG launcher/splash assets) cannot be
copied from text; those binaries are therefore not fabricated here.

## Important
The supplied native VPN implementation is a source draft. It establishes a
VpnService tunnel and reads packets, but the source itself does not implement
actual forwarding of non-blocked packets. It should therefore be treated as
development code rather than a finished VPN implementation.
