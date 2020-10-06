import OCL from 'openchemlib/full';
import axios from 'axios';

interface MoleculeProps {
    acceptor: number;
    averageBondLength: Function;
    bonds: number;
    donor: number;
    formula: Function;
    IUPACName: Function;
    logP: number;
    logS: number;
    polarSurfaceArea: number;
    rotatableBonds: number;
    stereoCerters: number;
    SVG: Function;
    weight: number;
    toMolfile: Function;
    toSMILES: Function;
}

export const Molecule = function(this: MoleculeProps, smiles: string) {
    var mol = OCL.Molecule.fromSmiles(smiles);
    var props = new OCL.MoleculeProperties(mol);
    
    this.acceptor = props.acceptorCount; 

    this.averageBondLength = function(nonHydrogenBondsOnly: boolean = false){
        return mol.getAverageBondLength(nonHydrogenBondsOnly);
    }

    this.bonds = mol.getBonds();

    this.donor = props.donorCount;

    this.formula = function(isHTML: Boolean = false){
        let formula = mol.getMolecularFormula().formula;
        if(isHTML){
            return formula.replace(/(\d+)/g, '<sub>$1</sub>');
        }else{
            return formula;
        }
    }

    this.IUPACName = function(cb: Function){
        axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${smiles}/property/IUPACName/JSON`)
            .then((res) => {
                cb(res.data['PropertyTable']['Properties'][0]['IUPACName']);
            });
    }

    this.logP = props.logP;

    this.logS = props.logS;

    this.polarSurfaceArea = props.polarSurfaceArea;

    this.rotatableBonds = props.rotatableBondCount;

    this.stereoCerters = props.stereoCenterCount;

    this.SVG = function(weight: number = 400, height: number = 400){
        return mol.toSVG(weight, height);
    }

    this.weight = mol.getMolweight();

    this.toMolfile = function(isV2000: Boolean = false){
        if(isV2000){
            return mol.toMolfile().replace('Actelion Java MolfileCreator 1.0', 'aromaticity');
        }else{
            return mol.toMolfileV3().replace('Actelion Java MolfileCreator 2.0', 'aromaticity');
        }
    }

    this.toSMILES = function(){
        return smiles;
    }
}