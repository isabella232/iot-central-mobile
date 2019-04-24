import logger from "../../common/logger";

// TODO: Once the API exposes device level SAS keys, use those instead to allow operator access.
export function getPrimaryConnectionString(dps): string | null {
  logger(dps);
  const appKey = dps.enrollmentGroups.find(
    enrollmentGroup =>
      enrollmentGroup.attestation.type === "symmetricKey" &&
      enrollmentGroup.provisioningStatus === "enabled"
  ).attestation.symmetricKey.primaryKey;
  if (!appKey) {
    throw new Error("Access denied--are you an application Admin?");
  }
  return appKey;
}
