import {bindable} from 'aurelia-framework';

/**
 * requires extra initialidzation of pdb components
 * <!-- Web component polyfill (only loads what it needs) -->
 * <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs/webcomponents-lite.js" charset="utf-8"></script>
 *
 * <!-- CSS -->
 * <link rel="stylesheet" type="text/css" href="https://www.ebi.ac.uk/pdbe/pdb-component-library/css/pdbe-molstar-1.1.0.css">
 *
 * <!-- JS -->
 * <script type="text/javascript" src="https://www.ebi.ac.uk/pdbe/pdb-component-library/js/pdbe-molstar-component-1.1.0.js"></script>
 */
export class PdbPdbeMolstar {
    @bindable moleculeId;
    @bindable customDataUrl;
    @bindable customDataFormat;
    @bindable hideControls='true';
    @bindable hidePolymer='false';
    @bindable rotate='true';
    @bindable alwaysrotate='false';
    @bindable width='100%';
    @bindable height='300px';
    @bindable assemblyId;
    @bindable visualStyle;
    @bindable showIons;

    /* Adding to template do not have effect as pdbe-molstar is third party web component, thus appendchild notifies api to interpret it
    Aurelia do not bind to unknown attributes - molecule-id etc. it creates
              <pdbe-molstar molecule-id='2hhd'
                      bg-color-r="255"
                      bg-color-g="255"
                      bg-color-b="255"></pdbe-molstar>
*/
    bind() {
      this.divstyle = `width:${this.width};height:${this.height}; position:relative`;
      console.log('bind() moleculeId,hidecontrols,hidepolymer,moleculeidref', this.moleculeId, this.hideControls, this.hidePolymer, this.parentref);
      this.pdbref = document.createElement('pdbe-molstar');
      if (this.moleculeId) this.pdbref.setAttribute('molecule-id', this.moleculeId);
      this.pdbref.setAttribute('hide-controls', this.hideControls);
      if (this.hidePolymer && this.hidePolymer === 'true') this.pdbref.setAttribute('hide-polymer', this.hidePolymer);
      if (this.assemblyId) this.pdbref.setAttribute('assembly-id', this.assemblyId);
      if (this.customDataUrl) {
        this.pdbref.setAttribute('custom-data-url', this.customDataUrl);
        if (this.customDataFormat) this.pdbref.setAttribute('custom-data-format', this.customDataFormat);
        else this.pdbref.setAttribute('custom-data-format', 'pdb');
      }
      //console.log('pdbpdbemolstart bind() this:', this);
      if (this.visualStyle) this.pdbref.setAttribute('visual-style', this.visualStyle);
      this.pdbref.setAttribute('bg-color-r', 255);
      this.pdbref.setAttribute('bg-color-g', 255);
      this.pdbref.setAttribute('bg-color-b', 255);
      this.parentref.appendChild(this.pdbref);
      if (this.showIons) {
        //prepare selection of ions to be visualised - representation as gaussian-surface (big ball) and different colors
        //console.log('showing ions:', this.showIons);
        //let viewerInstance = this.pdbref.viewerInstance;
        this.selectIonsSection = [];
        let ions = this.showIons.split(',');
        let i = 3;
        for (let ion of ions) {
          let color = this.selectColor(i++);
          this.selectIonsSection.push(
            {
              label_comp_id: ion,
              representation: 'gaussian-surface',
              representationColor: {r: color.r, g: color.g, b: color.b}
            });
        }
      }
    }

    attached() {
      //schedule to rotate and show ions after 3 sec
      if (this.rotate && this.rotate === 'true') {
        setTimeout(() => {
          //let pdbeMolstarComponent = document.getElementById(this.pid);
          let viewerInstance = this.pdbref.viewerInstance;
          viewerInstance.visual.toggleSpin(true);
          if (this.showIons) viewerInstance.visual.select({data: this.selectIonsSection});
        }, 3000);
        setTimeout(() => {
          //let pdbeMolstarComponent = document.getElementById(this.pid);
          let viewerInstance = this.pdbref.viewerInstance;
          viewerInstance.visual.toggleSpin(false);
        }, 60000);
      } else if (this.alwaysrotate && this.alwaysrotate === 'true') {
        setTimeout(() => {
          //let pdbeMolstarComponent = document.getElementById(this.pid);
          let viewerInstance = this.pdbref.viewerInstance;
          viewerInstance.visual.toggleSpin(true);
          if (this.showIons) viewerInstance.visual.select({data: this.selectIonsSection});
        }, 3000);
      } else {
        //schedule to show ions after 3 sec
        setTimeout(() => {
          if (this.showIons) viewerInstance.visual.select({data: this.selectIonsSection});
        }, 3000);
      }
    }

    selectColor(index, saturation = 75, lightness = 65) {
      const hue = (index - 1) * 137.508; // use golden angle approximation
      return this.hslToRgb(hue / 360, saturation / 100, lightness / 100);
    }

    /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   {number}  h       The hue
   * @param   {number}  s       The saturation
   * @param   {number}  l       The lightness
   * @return  {Array}           The RGB representation
   */
    hslToRgb(h, s, l) {
      let r; let g; let b;

      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        let hue2rgb = function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        let q = l < 0.5 ? (l * (1 + s)) : (l + s - l * s);
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
    }
}
