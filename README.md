# Instrucciones

### Configurar Eslint
`package.json`
```
  "eslintConfig": {
  "parser": "@babel/eslint-parser",
  "extends": [
    "standard",
    "standard-jsx",
    "standard-react"
  ]
}
```

### Run Proyect
Run android emulator for example whit `Android studio`
```
npx expo start
```

### Generate APK
- Ejecute `eas build:configure`

- In the `eas.json`

```
{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "channel": "development"
    },
    "preview": {
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}

```

- Next step ejecute 

`eas build -p android --profile preview` and generate a link for download apk 🎉