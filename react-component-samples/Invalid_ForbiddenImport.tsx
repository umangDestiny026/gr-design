// TEST: must be REJECTED. Imports a package that is not on the allowed list, and a relative file.
// Configure: Inputs  title (string)
// Expected: GC-IMPORT-001 for "axios" and GC-IMPORT-002 for "./helpers".
import axios from 'axios';
import { helper } from './helpers';

export default function ForbiddenImport({ title = 'Hi' }: { title?: string }) {
  void axios;
  void helper;
  return <h1>{title}</h1>;
}
