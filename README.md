![logo](http://cdn.fmartingr.com/github/peepboard/peepboard-logo.png)
---

Simple dashboard panels from json files.

## How it works

### Set up

For the initial setup you need to configure each widget and dashboard separately in files.

Then, a main file called peepboard.json will have the base settings and the dashboards to load.

``` json
# peepboard.json
{
  "base_path": "config/dir",
  "port": 8080,
  "dashboards": ["dash1", "dash2"]
}
```

The config path should have folders for dashboards and widgets, and a json file
inside of each folder for each item.

```
config_dir/peepboard.json
           dashboards/dash1.json
                      dash2.json
           wdigets/wid1.json
                   wid2.json
```

For more information about the widget and dashboard types check below.

Check the `sample` folder in the repository for an example configuration.

## Contrib

### Dashboards

#### Fullscreen

Renders a single widget into the full screen space.

``` json
{
  "type": "fullscreen",
  "params": {
    "widget": "<widget ID>"
  }
}
```

#### Flex

> :warning: Currently in development.

Renders rows of widgets automatically scaled based on CSS Flexbox.

``` json
{
  "type": "flex",
  "params": {
    "rows": [
      ["<widget id>", "<widget id>"],
      ["..."]
    ]
  }
}
```

### Widgets

#### Iframe

Renders the content of an URL into an iframe.

``` json
{
  "type": "iframe",
  "params": {
    "url": "<url here>"
  }
}
```

## Contribute

```
git clone git@github.com:fmartingr/peepboard.git
cd peepboard
npm install # Server requirements
bower install # Client requirements
bin/peepboard sample/peepboard.json
```

Server should be listening on port `8080`.

### Main stuff used here

- [Express](http://expressjs.com/) for the HTTP calls.
- [Socket.io](http://socket.io) for the interaction with the server calls.
- [RequireJS](http://requirejs.org) for the front-end libraries.
- [Polymer](https://www.polymer-project.org/1.0/) to render Dashboards and Widgets.
