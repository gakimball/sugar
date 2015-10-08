# Sugar

Sugar is syntactic sugar over npm scripts. It uses a YAML file like this to recreate the functionality of an npm script-based build system.

```yml
# Default script
start:
  # Run other scripts
  exec:
    - [scripts, styles, server]

scripts:
  # Run a command with this format
  run: tsc %o app.ts
  # Use these command line flags (replaces %o above)
  opts:
    watch: true
    m: commonjs
    t: es5
    emitDecoratorMetadata: true

server:
  # Run this command with no flags
  run: http-server

# Run two commands, one piping to the other
styles:
  sass:
    run: sass
    opts:
      loadPaths:
        - node_modules/foundation-sites/scss
        - node_modules/motion-ui/scss
      outputStyle: compressed
    next: pipe
  autoprefixer:
    run: autoprefixer
    opts:
      browsers:
        - last 2 versions
    output: app.css
```

## Develop Locally

```
git clone https://github.com/gakimball/sugar
cd sugar
npm i
npm test
```
