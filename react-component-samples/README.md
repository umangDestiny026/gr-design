# React component test files

Create the component first (Component Type: React Component, with the inputs and outputs listed for the file), then
upload the file. The starter button in the panel produces a file for the configured contract.

## Valid (should save)

| File | Inputs | Outputs | Expected |
| --- | --- | --- | --- |
| BlogList.tsx | title, subtitle, emptyText (string); posts (List (array)) | postSelected | valid. Bind `posts` to the Blog model list in the Dynamic tab |
| SimpleCounter.tsx | label (string); step (number) | countChanged | valid |
| PricingCards.tsx | title (string); plans (List (array)) | planSelected | valid; shows sample plans if `plans` is empty |
| DateBadge.tsx | label (Text); date (Text) | dateClicked | needs the package `dayjs` 1.11.13 added first (application settings, Packages). Without it: GC-IMPORT-001 for `dayjs` and `dayjs/plugin/relativeTime`. With it: valid, no warnings. Shows the date and how long ago it is, and sends the date when clicked. |
| ApiDataList.tsx | title (string); limit (number) | postClicked (add it with the "Add to Outputs" button, or in Configuration, otherwise GC-OUTPUT-001) | valid with warning GC-NET-001 (fetch). The warning does not block saving. Clicking a row sends the post through postClicked. |
| HeroBanner.tsx, HeroBannerV2.tsx | see the header of each file | | existing samples |

## Invalid (should be rejected, Save disabled)

| File | Inputs / outputs | Expected code |
| --- | --- | --- |
| Invalid_SyntaxError.tsx | title (string) | syntax error with line and column |
| Invalid_ForbiddenImport.tsx | title (string) | GC-IMPORT-001, GC-IMPORT-002 |
| Invalid_Eval.tsx | title (string) | GC-API-001 |
| Invalid_NoDefaultExport.tsx | title (string) | GC-EXPORT-001 |
| Invalid_UnconfiguredProp.tsx | title (string) only | GC-INPUT-002 |
| Invalid_WrongType.tsx | count (number) | GC-INPUT-003 |
| Invalid_UndeclaredOutput.tsx | label (string); output clicked | GC-OUTPUT-001 for `unknownKey` (+ warning GC-OUTPUT-003). Save disabled until `unknownKey` is added to the Outputs, with the "Add to Outputs" button in the upload panel or in Configuration. Applies to new and existing components. |
| Invalid_DefaultProps.tsx | title (string) | GC-API-003 |
| BrokenBanner.tsx | existing sample | see the file |

The expected codes come from reading the validator's code list and rules. They have not been run, so a mismatch
means either the file or the validator needs a look.

## Also worth trying

- Upload a valid file, then upload it again unchanged (should report no change).
- Upload a changed version in Development, then in a second environment.
- Open the same component in two browser tabs and save from both (conflict message).
- Rename the file to `.js` or upload an empty file (file checks).
