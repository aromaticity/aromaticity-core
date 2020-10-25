import OCL from 'openchemlib/full';
import axios from 'axios';

export function PubChem(input : {searchInput: string, searchBy: string},properties: Property[]|Property, cb: Function){
    let req = '';

    if(Array.isArray(properties)){
        let isLast = ',';
        for(var i=0; i<properties.length; i++){
            if(i===properties.length-1){
                isLast = '';
            }
            req += `${properties[i]}${isLast}`;
        }
    }else{
        req = properties.toString();
    }
    
    axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/${input.searchBy}/${input.searchInput}/property/${req}/JSON`)
        .then((res: any) => {
            let data = res.data['PropertyTable']['Properties'][0];
            if(Array.isArray(properties)){
                cb(data);
            }else{
                cb(data[properties]);
            }
        });

}

export function molFileToMol(molfile: string){
    return OCL.Molecule.fromMolfile(molfile);
}

export function molFileToSmiles(molfile: string){
    return molFileToMol(molfile).toSmiles();
}

export const Molecule = function(this: MoleculeProps, input: string) {

    this.setProperties = function (mol: OCL.Molecule){
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
            PubChem(this.toSMILES(), Property.IUPACName, cb);
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
            return mol.toSmiles();
        }
    }
    
    this.setProperties(OCL.Molecule.fromSmiles(input));
    
}

export interface MoleculeProps {
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
    setProperties: Function;
}

export enum Property {
    MolecularFormula = 'MolecularFormula',
    MolecularWeight = 'MolecularWeight',
    CanonicalSMILES = 'CanonicalSMILES',
    IsomericSMILES = 'IsomericSMILES',
    InChl = 'InChl',
    InChIKey = 'InChIKey',
    IUPACName = 'IUPACName',
    XLogP = 'XLogP',
    ExactMass = 'ExactMass',
    MonoisotopicMass = 'MonoisotopicMass',
    TPSA = 'TPSA',
    Complexity = 'Complexity',
    Charge = 'Charge',
    HBondDonorCount = 'HBondDonorCount',
    HBondAcceptorCount = 'HBondAcceptorCount',
    rotatableBondCount = 'rotatableBondCount',
    HeavyAtomCount = 'HeavyAtomCount',
    IsotopeAtomCount = 'IsotopeAtomCount',
    AtomStereoCount = 'AtomStereoCount',
    DefinedAtomStereoCount = 'DefinedAtomStereoCount',
    UndefinedAtomStereoCount = 'UndefinedAtomStereoCount',
    BondStereoCount = 'BondStereoCount',
    DefinedBondStereoCount = 'DefinedBondStereoCount',
    UndefinedBondStereoCount = 'UndefinedBondStereoCount',
    CovalentUnitCount = 'CovalentUnitCount',
    Volume3D = 'Volume3D',
    XStericQuadrupole3D = 'XStericQuadrupole3D',
    YStericQuadrupole3D = 'YStericQuadrupole3D',
    ZStericQuadrupole3D = 'ZStericQuadrupole3D',
    FeatureCount3D = 'FeatureCount3D',
    FeatureAcceptorCount3D = 'FeatureAcceptorCount3D',
    FeatureDonorCount3D = 'FeatureDonorCount3D',
    FeatureAnionCount3D = 'FeatureAnionCount3D',
    FeatureCationCount3D = 'FeatureCationCount3D',
    FeatureRingCount3D = 'FeatureRingCount3D',
    FeatureHydrophobeCount3D = 'FeatureHydrophobeCount3D',
    ConformerModelRMSD3D = 'ConformerModelRMSD3D',
    EffectiveRotorCount3D = 'EffectiveRotorCount3D',
    ConformerCount3D = 'ConformerCount3D',
    Fingerprint2D = 'Fingerprint2D'
}