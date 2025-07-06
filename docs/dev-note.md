# poc test wire property with apex

```bash
sf data import tree --files test/data/accounts.json -o u2025-02-24@zpc.test.com

sf apex generate class -n PocAccountController -d pkg-sandbox/main/default/classes

sf lightning generate component --name pocAccountSearchViaWireProperty --type lwc -d pkg-sandbox/main/default/lwc/wire-property-with-apex

```

## POC Components URLs:

```text
https://business-speed-2015-dev-ed.scratch.lightning.force.com/lightning/cmp/c__pocTrackNoTrackProperty

https://business-speed-2015-dev-ed.scratch.lightning.force.com/lightning/cmp/c__pocAccountSearchComparison

```
