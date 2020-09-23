# aromaticity-core

The core of aromaticity. For more information visit: <a href="https://aromaticity.io">https://aromaticity.io</a>.

aromaticity is being rebuilt and that will be the core package for <a href="https://aromaticity.io">aromaticity</a>, <a href="https://aromaticity.io/cli">aromaticity-cli</a> and other future applications.

## Docs

### Molecule

|Function|Description|
|---|---|
|`molFileToMol(molFileText: string): Molecule`|Returns the Molecule of the given MolFile (`V2000` and `V3000` MDL Molfile are both accepted.|
|`molToSmiles(mol: MolFile): string`|Returns the SMILES of the given Molecule.|

### Properties

|Function|Description|
|---|---|
|`getAcceptor(smiles: string): number`|Returns the Acceptor Number.|
|`getAverageBondLength(smiles: string, nonHydrogenBondsOnly: boolean = false): number`|Returns the Average Bond Length.|
|`getBonds(smiles: string): number`|Returns the Bonds Number.|
|`getDonor(smiles: string): number`|Returns the Donor Number.|
|`getFormula(smiles: string, isHTML: boolean = false): string`|Returns the Molecular Formula.|
|`getIUPACName(smiles: string, cb: Function): void`|Get the IUPAC Name and pass it to a callback function.|
|`getLogP(smiles: string): number`|Returns the LogP.|
|`getLogS(smiles: string): number`|Returns the LogS.|
|`getMolFile(smiles: string, isV2000: boolean = false): string`|Return the MolFile.|
|`getPolarSurfaceArea(smiles: string): number`|Returns the Polar Surface Area.|
|`getRotatableBond(smiles: string): number`|Return the Rotatable Bonds Number.|
|`getStereoCenter(smiles: string): number`|Returns the Stereo Centers Number.|
|`getSVG(smiles: string, width: number = 400, height: number = 400): string`|Returns the SVG.|
|`getWeight(smiles: string): number`|Returns the Molecular Weight.|