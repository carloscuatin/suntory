# Suntory

![Suntory](suntory.gif "Cuando todo falla, ponte cómodo y sirvete un suntory")

Algunas veces tenemos que hacer cosas que no nos gustaría. Sin duda pasar por encima de los eventos sintácticos de ReactJS es una de esas cosas. Se me pueden ocurrer escenarios donde eso sea la solución más simple:

* Cuando deseamos trackear toda clase de acciones raras en un componente y no expone una API adecuada para ello.
* Cuando debemos trabajar con componentes de terceros que exponen una API muy limitada.

En fin, por el motivo que sea, has llegado al punto de decidir que necesitas más potencia de la que tienes con ReactJS.

> Piensatelo dos veces antes de decidir eso. Y cuando estes seguro, pienso una vez más. Es MUY MALA IDEA, usar esto son saber como ni porque. Asegura muchisimo que no hay otras opciones.

Si al final, vas a hacerlo, hazlo bien. Y para eso está esta librería.

Con la misma API que ya se está usando en [Backbone para la gestión de eventos](http://backbonejs.org/#View-events) vas a poder delegar eventos a tus componentes.

## Instalación:

### npm

```javascript
$ npm install @schibstedspain/suntory

```

### Clone the repo

```
$ npm clone https://github.com/SUI-Components/suntory
$ cd suntory
$ npm install
$ npm run dev
```

Go to http://localhost:8080 to see the demo. **Open the Developers Tools**

## Compatibilidad

Actualmente EI9+, Chrome37+, FireFox38+
Limitado al soporte de [matches](http://caniuse.com/#search=matches)

Esto es así para evitar cargar `src/vendor/zepto.events`. Posiblemente esto acabe cambiando próximamente en la versión 2.0

## Delegación de Eventos:

Suntory es un decorador que te va a permitir de forma simple delegar eventos a tus componentes de ReactJS. Para ello solo tienes pasarle un objeto con la definición del evento como clave y como valor el handler del evento.

```javascript
import suntory from '@schibstedspain/suntory';

class Item extends React.Component {
  render() {
    return <li className="List-item" data-click>{this.props.text}</li>;
  }
}

@suntory({
  'mouseover [data-click]': function(e) { console.log(e.target) }
})
class List extends React.Component {
  render() {
    return (
        <div>
          <ul>
            {
              "Hola mundo, esto es una prueba de suntory".split(' ').map((text, index) => {
                return (<Item key={index} text={text} />);
              })
            }
          </ul>
        </div>
    )
  }
}
```

Los eventos serán todos delegados a la capa contenedora de tu componente. Por lo que no se verán afectados componentes similares en otros partes de tu código.

Por otra parte cuando tu componente sea desmontado del DOM, todos los eventos serán revertidos.
