// Auto-generated stub — frontend-only app, no canister backend.
// Satisfies imports from config.ts and useActor.ts.

export const idlFactory = ({ IDL }) => {
  return IDL.Service({});
};

export const canisterId =
  typeof process !== "undefined" ? process.env.CANISTER_ID_BACKEND || "" : "";

export const init = ({ IDL: _IDL }) => {
  return [];
};

// Type stubs (values used at runtime)
export class ExternalBlob {
  constructor(_data) {
    this.data = _data;
  }
}

export const createActor = (_canisterId, _options) => {
  return {};
};

export const CreateActorOptions = {};
