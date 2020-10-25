// Import dependecies
import { Molecule, PubChem, Property } from '../dist/main';

// Use the Constructor to build a Molecule
var mol = new Molecule('CCC');

// Compute properties or query PubChem
PubChem({searchInput: '[Ca++]', searchBy: 'smiles'}, Property.CID, (res) => {
    console.log(res);
})