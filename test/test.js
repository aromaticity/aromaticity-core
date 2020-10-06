// Import dependecies
import { Molecule } from '../dist/main';

// Use the Constructor to build a Molecule
var mol = new Molecule('CCCO');

// Compute properties or query PubChem
mol.IUPACName((name) => {
    console.log(name);
});