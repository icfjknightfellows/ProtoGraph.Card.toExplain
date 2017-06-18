# Proto.Card.toExplain
ProtoGraph compatible Explainer Card.
# Creating a ProtoGraph Compatible Explainer Card.

`Getting Started`
  * Fork the repository from  [Proto.Card.toExplain](https://github.com/pykih/Proto.Card.toExplain "Proto.Card.toExplain").
 
`Development`
* Functions we need to expose mandatorily export.
  * Render function for `initialising` the card.
  * Render function for `handling data updates` in the card.
* Render function should accept three attributes:
  * `data_url` - It can be either a url or raw json.
  * `selector` - The query selector of the element or the element itself where the card is going to be rendered.
  * `mode` - The mode of the card that needs to be rendered. THe possible values for the modes are:
    * mobile
      * embeddable
      * grabbable
      * full
    * desktop
      * embeddable
      * grabbable
      * full
    * tablet
      * embeddable
      * grabbable
      * full
    * The function should be under the `Pro` Library.
    * The syntanx will be used as:
    ---
        var x = new Protograph.Card.toExplain ({
            selector: document.querySelector('#selector'),
            data_url: 'url/to/sample.json',
            schema_url: 'url/to/schema.json'
        });

`Production`
* The folder structure for the distribution should be as follows:
    * `dist/`
        * `v0.0.1 // version number` 
            * `card.min.js`
            * `card.min.css`
            * `index.html`
            * `schema.json`
            * `sample.json`
            * `card.ai`
            * `card.png`
        * `v0.1.1`
            * =====
            * =====
        * `v1.0.0` 
            * =====
            * =====
* All the files inside the version folders are mandatory.
