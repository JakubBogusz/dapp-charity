# TrustFund - Ethereum-Based Charity Platform

![image](https://github.com/JakubBogusz/dapp-charity/assets/67878304/32b40b9f-c684-4f64-aecb-89db47269699)

## Introduction

Welcome to the TrustFund, an innovative blockchain-based application designed and implemented as part of a master's thesis project. TrustFund is a charity-focused DApp (Decentralized Application) that allows users with appropriate permissions to manage and perform charitable actions. Authorized users can contribute donations in Ether, leveraging the unique features of blockchain technology for transparency and accountability.

## Enhanced Features

- **Charity Action Configuration:** Enables authorized users to create and manage charity campaigns.
- **Ether Donations:** Facilitates donations in Ether by verified users.
- **Blockchain Transparency:** Guarantees traceability and transparency of funds directed to charitable causes.
- **Smart Contract Auditing:** Features Solidity-based audited Smart Contracts for managing Ether transfers.
- **Optimized DApp Platform:** Utilizes Hardhat for robust, scalable DApp development and testing.
- **Modern and Adaptive UI:** Designed with React.js and TailwindCSS, ensuring an intuitive and visually appealing user interface across devices.
- **Direct Ethereum Integration:** Employs Ethers.js for secure and direct interactions with the Ethereum blockchain.

## Cutting-Edge Technologies

TrustFund incorporates advanced technologies such as:

- **Solidity:** For creating secure and efficient Smart Contracts.
- **Ethereum:** The foundational blockchain platform.
- **React.js & TailwindCSS** For a responsive, interactive front-end.
- **Hardhat & OpenZeppelin:** Used for testing, deployment, and secure contract development.

## Security and Auditing Measures

TrustFund underwent extensive auditing to mitigate potential vulnerabilities, focusing on:

- **Attack Vector Analysis:** Identifying security threats.
- **Coding Practice Review:** Maintaining high coding standards.
- **Contract Security Methods:** Implementing robust security measures.

## Local Installation Guide

### Preliminary Setup
- Ensure Visual Studio Code is installed.
- Open the terminal within VS Code.
- For performing static and dynamic analysis the Docker is required.

### Installation Steps
1. **Start Local Hardhat Blockchain:**
   - Run `yarn hardhat node` or `npx hardhat node`.
2. **Compile Smart Contract Scripts:**
   - Execute `yarn hardhat run scripts/deploy.js`.
3. **Launch React Application:**
   - Enter `yarn start`.
4. **Execute Unit Tests:**
   - Run `npx hardhat test`.
5. **Perform Static Analysis:**
   - Use the command `slither .` for static code analysis.
6. **Testing with advanced tools**
    - Download the Trail Of Bits advanced toolbox and run it inside a container. 
    Run following terminal command: `docker pull trailofbits/eth-security-toolbox`

### MetaMask Troubleshooting
- If you encounter issues with MetaMask:
   - Navigate to your wallet profile.
   - Go to `Settings` > `Reset` > `Restore user data` > `Clear activity and nonce data`.

### Best Practices
- Confirm all dependencies are installed before initiating the setup.
- Regularly update your tools and dependencies to ensure compatibility and bolster security.
