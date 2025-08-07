/* tslint:disable */
/* eslint-disable */
export function findDominationNumber(bitNodes: bigint, order: number, neighborhood: BigUint64Array): DominationResult;
export class DominationResult {
  free(): void;
  constructor(domination_number: number, dominating_set: bigint);
  domination_number: number;
  dominating_set: bigint;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_dominationresult_free: (a: number, b: number) => void;
  readonly __wbg_get_dominationresult_domination_number: (a: number) => number;
  readonly __wbg_set_dominationresult_domination_number: (a: number, b: number) => void;
  readonly __wbg_get_dominationresult_dominating_set: (a: number) => bigint;
  readonly __wbg_set_dominationresult_dominating_set: (a: number, b: bigint) => void;
  readonly dominationresult_new: (a: number, b: bigint) => number;
  readonly findDominationNumber: (a: bigint, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
