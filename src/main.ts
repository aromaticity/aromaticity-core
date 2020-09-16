import OCL from 'openchemlib/full';
import fetch from 'node-fetch';

enum nmr { H, C };

function molFromSmiles(smiles: string){
    return OCL.Molecule.fromSmiles(smiles);
}

export function molFileToMol(molFileText: string){
    return OCL.Molecule.fromMolfile(molFileText);
}

export function molToSmiles(mol: any){
    return  mol.toSmiles();
}

export function getAcceptor(smiles: string){
    return new OCL.MoleculeProperties(molFromSmiles(smiles)).acceptorCount; 
}

export function getAverageBondLength(smiles: string, nonHydrogenBondsOnly: boolean = false){
    return molFromSmiles(smiles).getAverageBondLength(nonHydrogenBondsOnly);
}

export function getBonds(smiles: string){
    return molFromSmiles(smiles).getBonds();
}
  
export function getDonor(smiles: string){
    return new OCL.MoleculeProperties(molFromSmiles(smiles)).donorCount;
}

export function getFormula(smiles: string, isHTML: boolean = false){
    const formula = molFromSmiles(smiles).getMolecularFormula().formula;
    if(!isHTML){
        return formula;
    }else{
        return formula.replace(/(\d+)/g, '<sub>$1</sub>');
    }
}

export function getIUPACName(smiles: string, cb: Function){
    fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${smiles}/property/IUPACName/JSON`)
        .then((res: any) => res.json())
        .then((data: any) => { cb(data.PropertyTable.Properties[0].IUPACName); } )
        .catch((error: string) => { console.error(error) })
}

export function getLogP(smiles: string){
    return new OCL.MoleculeProperties(molFromSmiles(smiles)).logP;
}

export function getLogS(smiles: string){
    return new OCL.MoleculeProperties(molFromSmiles(smiles)).logS;
}

export function getMolFile(smiles: string, isV2000: boolean = false){
    var mol = molFromSmiles(smiles);
    if(!isV2000){
      return mol.toMolfile().replace('Actelion Java MolfileCreator 1.0', 'aromaticity');
    }else{
      return mol.toMolfileV3().replace('Actelion Java MolfileCreator 2.0', 'aromaticity');;
    }
}

/*
export function getNMRSpectra(smiles: string, type: nmr, cb: Function){
    let predictorAtom = predictor.fetchProton();
    
    if(type == nmr.H){
      predictorAtom = predictor.fetchProton();
    }else{
      predictorAtom = predictor.fetchCarbon();
    }
    
      Promise.all([
        predictor.spinus(getMolFile(smiles)),
        predictorAtom
      ])
      .then((res) => { cb(res[0]) })
      .catch((err) => console.log(err));
}
*/

export function getPolarSurfaceArea(smiles: string){
    return new OCL.MoleculeProperties(molFromSmiles(smiles)).polarSurfaceArea;
  }
  
export function getRotatableBond(smiles: string){
    return new OCL.MoleculeProperties(molFromSmiles(smiles)).rotatableBondCount;
}
  
export function getStereoCenter(smiles: string){
    return molFromSmiles(smiles).getStereoCenterCount();
}
  
export function getSVG(smiles: string){
    return molFromSmiles(smiles).toSVG(400, 400);
}

export function getWeight(smiles: string){
    return molFromSmiles(smiles).getMolweight();
}