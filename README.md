# ScrollPoints.js
Crea y gestiona eventos de Scroll de una forma sencilla.

Encuentra toda la información y ejemplos en scrollpoints.hectoralvarez.me

Copyright © 2015 Héctor Álvarez
Licensed under the MIT license.
license.hectoralvarez.me/mit


Crea una instancia de scrollpoints:

var myPoints = new ScrollPoints();

Ahora añade nuevos puntos. Los puntos se deben añadir en el orden en el que se hará scroll en ellos:

myPoints.addPoint(
  new Point({
    id:'#id',
    onScroll:function(){
      ....
    },
    onScrollBackwards:function(){
      ....
    },
    offset:150,
    fadeTime:2000,
    fadeElements:['#id'],
    menuHighlight:{'class':'selectedMenuItem',
                   'menuEntry':'#menuId'}
  })
);


Se deben definir la función que se ejecutará cuando se haga scroll como onScroll.
onScrollBackwards contiene la función que se ejecutará si se hace scroll en la dirección contraria.

Existen funcionalidades predefinidas. si al hacer scroll se desea que un elemento html o varios aparezcan haciendo fadeIn. se pueden definir en un array con sus ids, en la propiedad fadeElements.

Además, si se desea que se añada una clase css a un elemento de menú, puede definirse bajo menuHighlight con la siguiente estructura:

{'class':'clase css que se aplicará',
'menuEntry':'#id de la entrada de menu a la que se le aplicará'}

También pueden dejarse sin definir y añadir el comportamiento deseado en las funciones onScroll y onScrollBackwards.

Si se desea que los elementos etiquetados como fadeIn se desvanezcan al hacer scroll hacia arriba, debe definirse, al menos, una función onScrollBackwards vacia. si se deja sin definir ningún comportamiento automatico se ejecutará al hacer scroll hacia arriba.

Por último, añade una llamada al tu scrollpoints en el evento onScroll de jquery

$(window).on('scroll', function() {
  myPoints.onScroll();
});

Para mas ejemplo y documentación, por favor visita scrollpoints.hectoralvarez.me

No dudes en ponerte en contacto para cualquier duda o sugerencia.

Actualmente el proyecto está en las primeras fase de desarrollo.
