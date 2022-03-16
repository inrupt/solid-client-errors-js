// Verify that imports from the main export work:
import { sampleModuleFn as mainModuleFn } from "@inrupt/solid-client-errors";
// Verify that submodule imports work:
import { sampleModuleFn } from "@inrupt/solid-client-errors/module";

console.log(mainModuleFn());
console.log(sampleModuleFn());
