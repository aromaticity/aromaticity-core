// Import dependecies
import { Molecule, PubChem, Property } from '../dist/main';

// Use the Constructor to build a Molecule
var mol = new Molecule('/Users/themagiulio/Desktop/untitled.mol');

// Compute properties or query PubChem
PubChem('[Ca++]', Property.Charge, (res) => {
    console.log(res);
})