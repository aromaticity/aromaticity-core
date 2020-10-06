# aromaticity-core

[![npm version](https://badge.fury.io/js/aromaticity-core.svg)](https://badge.fury.io/js/aromaticity-core)

The core of aromaticity. For more information visit: <a href="https://aromaticity.io/core">https://aromaticity.io/core</a>.


## Docs

### Constructor

`new Molecule(SMILES: string): Molecule`

### Properties

|Properties|Description|
|---|---|
|`acceptor: number`|Returns the Acceptor Number.|
|`averageBondLength(nonHydrogenBondsOnly: boolean = false): number`|Returns the Average Bond Length.|
|`bonds: number`|Returns the Bonds Number.|
|`donor: number`|Returns the Donor Number.|
|`formula(isHTML: boolean = false): string`|Returns the Molecular Formula.|
|`IUPACName(cb: Function): void`|Get the IUPAC Name and pass it to a callback function.|
|`logP: number`|Returns the LogP.|
|`logS: number`|Returns the LogS.|
|`polarSurfaceArea: number`|Returns the Polar Surface Area.|
|`rotatableBonds: number`|Return the Rotatable Bonds Number.|
|`stereoCenters: number`|Returns the Stereo Centers Number.|
|`SVG(width: number = 400, height: number = 400): string`|Returns the SVG.|
|`weight: number`|Returns the Molecular Weight.|
|`toMolfile(isV2000: boolean = false): string`|Return the MolFile.|
|`toSMILES(): string`|Returns the SMILES.|

## Example

```
import { Molecule } from 'aromaticity-core';

let mol = new Molecule('CCCO');

mol.IUPACName((name) => {
    console.log(name);  // propan-1-ol
})

console.log(mol.weight);    // 60

console.log(mol.formula())  // C3H8O