# QUEAP - Qual é a palavra

App mobile para anotação de sugestões de palavras para jogos de adivinhação com dicas.

### Plataformas

- Android **4.1+**
- iOS **7+**
- Windows Phone **8.1+**
- Browsers:
  - Chrome **31+**
  - Firefox **31+**
  - Opera **12+**
  - Safari **7+**

## Estrutura do projeto

### Tecnologias/Ferramentas

- Angular 2 (com *TypeScript*);
- Cordova;
- Gulp;
- HTML + CSS (SCSS);
- [Phonon Framework][0].

### Estrutura de pastas

```
queap
  \- config
      Centraliza a maioria das configurações e processos de build
    \- gulp
        Gulp tasks are defined here.
    \- typings
        Arquivos de definição do TypeScript (*.d.ts)
  \- mobile
      Configurações do projeto do cordova
    \- www
        Diretório onde a aplicação será construída (target)
  \- public
      Outros arquivos da aplicação que não possuem dependências via npm
  \- src
      Arquivos fonte da aplicação (ex: '.js', '.ts', '.scss').
```

## Scripts disponíveis

*A partir da pasta raíz do projeto:*

### `npm install`

Resolve e instala as dependências da aplicação e compila os arquivos de definição *Typings*.

### `npm start`

Compila a aplicação e dependências e inicia um servidor na porta 8000. Também observa os arquivos por alterações (*watchify* e *gulp-watch*).

### `npm run build`

Compila a aplicação com "perfil"  de *Produção* (minificação de arquivos e outras otimizações).

### `npm run cordova:build`

Compila a aplicação com "perfils" *Produção* e *Cordova* (minificação de arquivos e outras otimizações).
Realiza configurações específicas para build com Cordova.

### `npm run cordova:emulate`

Inicializa o emulador na plataforma *Android* (depende do *cordova-build*).

### `npm run cordova`

Executa os comandos *cordova-build* e *cordova-emulate* em sequência.

[0]: http://phonon.quarkdev.com/
