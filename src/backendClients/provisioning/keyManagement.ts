export function getPrimaryConnectionString(dps): string | null {
  return dps.enrollmentGroups.find(
    enrollmentGroup =>
      enrollmentGroup.attestation.type === "symmetricKey" &&
      enrollmentGroup.provisioningStatus === "enabled"
  ).attestation.symmetricKey.primaryKey;
}
