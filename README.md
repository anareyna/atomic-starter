# Atomic Starter

> Folder structure for atomic design projects inspired by Brad Frost book. (WIP)

## Installation

To get started, make sure you have [node.js](http://nodejs.org/) installed.
Open the terminal and change directory to `atomic-starter/`.

* Install npm dependencies.
		```
		npm install
		```
* Run all the default gulp tasks.
		```
		gulp
		```
* Open project in browser and watch for file changes.
		```
		gulp watch
		```

## Start coding

You need to work in the `src` folder, where all your source files should be located. The project structure looks something like this:

```
atomic-starter/
└── src/
		├── assets/
		│		├── fonts/
		│		├── icons/
		│		└── img/
		├── css/
		├── html/
		└── js/
```
Inside the `src/css` and `src/html` folders we have a similar folder structure that follows the atomic design principles:
```
css/
	├── __00-toolbox/
	├── __01-elements/
	├── __02-components/
	├── __03-layouts/
	└── __04-pages/

```

We have 4 levels of abstraction in this proposal for an atomic design project based on http://bradfrost.com/blog/post/atomic-web-design/
```
Level 1: Elements (Atoms)
Level 2: Components (Molecules)
Level 3: Layouts (Organisms)
Level 4: Pages (Templates/pages)
```
For any other tool or utility we might need in the css or html folders we have a `Level 0: Toolbox` which has parts of the css or html that are not directly useable on their own. This could be mixins, variables like colors and sizes, partials or settings.

To have a better understanding of the atomic design pattern and how it helps maintain and scalate better large projects, check the next Related posts section.

## Related posts:
* [Atomic design](http://bradfrost.com/blog/post/atomic-web-design/)
* [CSS architecture for design systems - Important read!!!](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)
* [SUIT CSS utilities](https://github.com/suitcss/utils)
* [UI code with namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
* [http://cssguidelin.es/](http://cssguidelin.es/)
* [BEM Methodology](https://en.bem.info/methodology/)



## Gulp tasks
In the terminal make sure you are in the `atomic-starter/` directory.


### Compile Sass
```
	gulp css
```
This will compile all the `.scss` files in `src/css/` and concatenate them to a single file located in `dist/css/styles.css`, except for `fonts.scss` which will be compiled to a separared css file `dist/css/fonts.css`.

### Compile Pug
```
	gulp html
```
This will compile to html all the `.pug` files in `src/html/` and place them into the folder located in `dist/`.

### Compile Js
```
	gulp Js
```
This will transpile all the `.js` files in `src/js/` and concatenate them to a single file located in `dist/js/app.js`. It supports ES6. If you want to use any js plugin it's recommended that you do so by using [bower](http://bower.io).

### Generate sprites

```
	gulp sprite
```
This task will create the `sprite.png` located at `dist/img/` which will also be the optimized (minified) image version.
In order to use the mixin that this task creates you have to follow this structure in any of your `.scss` files.
```
.ico {
	sprite($ico1);
}
```
Which will render to css. Notice that the `$ico1` variable name has to be the same as your image file name `src/assets/img/sprite/img1.png`.

## Generate icons

```
		gulp icons
```
This task will generate the `iconFont` font for the icons that you can place in the `src/assets/icons/` with the `*.svg` extension.

## Generate font styles
```
		gulp fonts
```
This task will generate the styles for the fonts placed in the `src/assets/fonts/` folder.

### Minimize images
```
	gulp imagemin
```
This task will create a copy of all your image files located in `src/assets/img/` and create an optimized and lighter version in the folder `dist/img/`.



### Run all tasks
```
	gulp
```
This task runs all the previous tasks.


## Styleguide

```
		npm run styleguide
```

This will generate automatically a living styleguide in `styleguide/` folder with Nucleus based on your css comments. For more information visit: 

https://holidaypirates.github.io/nucleus/

## Resources
* [Pug](http://pugjs.org/)
* [Sass](http://sass-lang.com/) also uses [Lost (Grid System)](https://github.com/peterramsing/lost) and [Breakpoint Slider (Media queries)](https://github.com/lolmaus/breakpoint-slicer)
* [Nucleus](https://holidaypirates.github.io/nucleus/)

* [Gulp](http://gulpjs.com/)
* [Bower](http://bower.io)

