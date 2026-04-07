import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Dignity contract stack with:", deployer.address);

  // 1. RoleManager
  const RoleManager = await ethers.getContractFactory("RoleManager");
  const roleManager = await RoleManager.deploy(deployer.address);
  await roleManager.waitForDeployment();
  console.log("RoleManager:", await roleManager.getAddress());

  // 2. IdentityRegistry
  const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
  const identityRegistry = await IdentityRegistry.deploy(deployer.address);
  await identityRegistry.waitForDeployment();
  console.log("IdentityRegistry:", await identityRegistry.getAddress());

  // 3. ComplianceRegistry
  const ComplianceRegistry = await ethers.getContractFactory("ComplianceRegistry");
  const complianceRegistry = await ComplianceRegistry.deploy(
    deployer.address,
    await identityRegistry.getAddress()
  );
  await complianceRegistry.waitForDeployment();
  console.log("ComplianceRegistry:", await complianceRegistry.getAddress());

  // 4. CanonicalSecurityToken (DIGAU)
  const CST = await ethers.getContractFactory("CanonicalSecurityToken");
  const token = await CST.deploy(
    "Dignity Gold Token",
    "DIGAU",
    "XS_DIGNITY_GOLD_001",
    deployer.address,
    await complianceRegistry.getAddress()
  );
  await token.waitForDeployment();
  console.log("CanonicalSecurityToken (DIGAU):", await token.getAddress());

  // 5. IssuanceController
  const IssuanceController = await ethers.getContractFactory("IssuanceController");
  const issuance = await IssuanceController.deploy(deployer.address, await token.getAddress());
  await issuance.waitForDeployment();
  console.log("IssuanceController:", await issuance.getAddress());

  // 6. RedemptionController
  const RedemptionController = await ethers.getContractFactory("RedemptionController");
  const redemption = await RedemptionController.deploy(deployer.address, await token.getAddress());
  await redemption.waitForDeployment();
  console.log("RedemptionController:", await redemption.getAddress());

  // 7. ReserveProofAnchor
  const ReserveProofAnchor = await ethers.getContractFactory("ReserveProofAnchor");
  const proofAnchor = await ReserveProofAnchor.deploy(deployer.address);
  await proofAnchor.waitForDeployment();
  console.log("ReserveProofAnchor:", await proofAnchor.getAddress());

  // 8. TimelockAdmin
  const TimelockAdmin = await ethers.getContractFactory("TimelockAdmin");
  const timelock = await TimelockAdmin.deploy([deployer.address], [ethers.ZeroAddress]);
  await timelock.waitForDeployment();
  console.log("TimelockAdmin:", await timelock.getAddress());

  // 9. Grant ISSUER_ROLE on token to IssuanceController
  const ISSUER_ROLE = await token.ISSUER_ROLE();
  await token.grantRole(ISSUER_ROLE, await issuance.getAddress());
  console.log("Granted ISSUER_ROLE to IssuanceController");

  console.log("\n✓ All contracts deployed successfully.");
  console.log("\nCopy these to your .env.local:");
  console.log(`NEXT_PUBLIC_TOKEN_ADDRESS=${await token.getAddress()}`);
  console.log(`NEXT_PUBLIC_ISSUANCE_CONTROLLER_ADDRESS=${await issuance.getAddress()}`);
  console.log(`NEXT_PUBLIC_REDEMPTION_CONTROLLER_ADDRESS=${await redemption.getAddress()}`);
  console.log(`NEXT_PUBLIC_PROOF_ANCHOR_ADDRESS=${await proofAnchor.getAddress()}`);
  console.log(`NEXT_PUBLIC_IDENTITY_REGISTRY_ADDRESS=${await identityRegistry.getAddress()}`);
  console.log(`NEXT_PUBLIC_COMPLIANCE_REGISTRY_ADDRESS=${await complianceRegistry.getAddress()}`);
  console.log(`NEXT_PUBLIC_TIMELOCK_ADDRESS=${await timelock.getAddress()}`);
  console.log(`NEXT_PUBLIC_ROLE_MANAGER_ADDRESS=${await roleManager.getAddress()}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
