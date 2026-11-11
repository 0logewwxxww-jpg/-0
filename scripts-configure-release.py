from pathlib import Path
import re
p = Path('android/app/build.gradle')
s = p.read_text()
if 'signingConfigs' not in s:
    s = re.sub(r'android\s*\{', """android {
    signingConfigs {
        release {
            storeFile file(RELEASE_STORE_FILE)
            storePassword RELEASE_STORE_PASSWORD
            keyAlias RELEASE_KEY_ALIAS
            keyPassword RELEASE_KEY_PASSWORD
        }
    }
""", s, count=1)
s, count = re.subn(r'(buildTypes\s*\{\s*release\s*\{)', r'\1\n            signingConfig signingConfigs.release', s, count=1)
if count != 1:
    raise SystemExit('Could not locate release buildType in generated Gradle file')
p.write_text(s)