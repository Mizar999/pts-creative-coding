# Readme - TypeScript, Parcel, Pts

## Parcel

- Installieren per npm
    ```powershell
    npm install -g parcel-bundler
    ```
- im Projektverzeichnis package.json-Datei anlegen
    ```powershell
    cd "project\directory"
    npm init -y
    ```
- Entwicklung: lokaler Server starten mit Verweis auf Einstiegspunkt
    ```powershell
    cd "directory\with\index.html"
    parcel index.html
    ```
- Build: für Produktiveinsatz
    ```powershell
    cd "directory\with\index.html"
    parcel build index.html
    ```

## Typescript

- Parcel installiert beim ersten Ausführen einer *.ts-Datei automatisch einen TypeScript-Compiler
- für globale Installation per npm
    ```powershell
    npm install -g typescript
    ````
- im Projektverzeichnis eine tsconfig.js-Datei anlegen
    ```json
    {
        "compilerOptions": {
            "target": "es6",
            "module": "commonjs",
            "sourceMap": true
        }
    }
    ```

## Pts

- lokale Installation per npm
    ```powershell
    cd "project\directory"
    npm install pts --save
    ```
- falls das Modul nicht von Visual Studio Code gefunden wird
    - CTRL + SHIFT + P
    - TypeScript: Restart TS server
    - (in einer *.ts ausführen)