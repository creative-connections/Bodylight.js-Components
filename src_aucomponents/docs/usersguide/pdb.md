# PDB components

Supports PDB components 
Requires additional initialization from external resources (load JS and CSS)
```html
<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://www.ebi.ac.uk/pdbe/pdb-component-library/css/pdbe-molstar-1.1.0.css">
<!-- JS -->
<script type="text/javascript" src="https://www.ebi.ac.uk/pdbe/pdb-component-library/js/pdbe-molstar-component-1.1.0.js"></script>
```
further info at https://github.com/PDBeurope/pdbe-molstar/wiki

## pdbe-molstar
To visualize molecule in PDB database
* molecule-id - required - pdb id of molecule e.g. 2h35
* hide-controls - default true - hides controls within the window
* hide-polymer - default false - hides controls within the window
* rotate - will rotate for 60 sec. and then stops, default true.
* alwaysrotate - will rotate always
* width, height - set width and height of canvas to render pdbe component, include unit in css, e.g. '300px' or '100%'
* visual-style - set visual style - "cartoon","ball-and-stick",...
* show-ions - comma separated labels of ions to be shown differently using gaussian-surface - big balls 
* custom-data-url - sets url to custom pdb file 

The component renders by default window with width 100% and height 400px and set's automatic spin of the molecule for 60s.

Molecule 2j5w with selected ions Cu,Ca,Na - these ions are identified by label_comp_id - see PDBML in downloads of PDB, e.g. https://www.ebi.ac.uk/pdbe/entry/pdb/2j5w
with height 600px.  
`<bdl-pdb-pdbe-molstar molecule-id="2j5w" show-ions="CU,CA,NA" height="600px"></bdl-pdb-pdbe-molstar>`
<bdl-pdb-pdbe-molstar molecule-id="2j5w" show-ions="CU,CA,NA" height="600px"></bdl-pdb-pdbe-molstar>


Ball and Stick instead of cartoon representation
`<bdl-pdb-pdbe-molstar id="pdb1m4e" molecule-id="1m4e" hide-controls="true" height="500px" visual-style="ball-and-stick" rotate="false"></bdl-pdb-pdbe-molstar>`

<bdl-pdb-pdbe-molstar id="pdb1m4e" molecule-id="1m4e" hide-controls="true" height="500px" visual-style="ball-and-stick" rotate="false"></bdl-pdb-pdbe-molstar>



`<bdl-pdb-pdbe-molstar molecule-id="5n27" assembly-id="2"></bdl-pdb-pdbe-molstar>`


`<bdl-pdb-pdbe-molstar molecule-id="5jkk" rotate="false"></bdl-pdb-pdbe-molstar>`
