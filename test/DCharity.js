const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DCharity", function () {
  let owner, addr1, addr2, DCharity, dCharity;

  beforeEach(async function () {
    DCharity = await ethers.getContractFactory("DCharity");
    [owner, addr1, addr2] = await ethers.getSigners();
    dCharity = await DCharity.deploy(5); // pass 5% tax as param
  });

  async function getBlockTimestamp(blockNumber) {
    const block = await ethers.provider.getBlock(blockNumber);
    return block.timestamp;
  }

  function setupTestProjectData() {
    return {
      title: "Test Project",
      description: "This is a test project description",
      imageURL: "https://test.com/image.jpg",
      cost: ethers.utils.parseEther("1"),
      //expires at 1 day from now, in seconds
      expiresAt: Math.floor(Date.now() / 1000) + 86400
    };
  }

  describe("Deployment", function () {
    it("Should set the correct owner and project tax", async function () {
      expect(await dCharity.owner()).to.equal(owner.address);
      expect(await dCharity.projectTax()).to.equal(5);
    });
  });

  describe("Create Project", function () {
    const { title, description, imageURL, cost, expiresAt } = setupTestProjectData();

    it("Should create a project and emit an event", async function () {
      const createProjectTx = await dCharity
        .connect(owner)
        .createProject(title, description, imageURL, cost, expiresAt);

      const createProjectReceipt = await createProjectTx.wait();

      expect(createProjectReceipt.events).to.satisfy(async function (events) {
        const event = events.find(
          (e) => e.event === "Action" && e.args.actionType === "PROJECT CREATED"
        );

        if (!event) return false;

        const block = await ethers.provider.getBlock(createProjectReceipt.blockNumber);
        return event.args.executor === owner.address && event.args.timestamp.eq(block.timestamp);
      });
    });

    it("Should failed when at least one of required fields is empty", async function () {
      const emptyTitle = "";

      await expect(
        dCharity.connect(owner).createProject(emptyTitle, description, imageURL, cost, expiresAt)
      ).to.be.revertedWith("Title cannot be empty!");
    });
  });

  describe("Update Project", function () {
    const { title, description, imageURL, cost, expiresAt } = setupTestProjectData();

    it("Should update a project and emit an event", async function () {
      await dCharity
        .connect(owner)
        .createProject(title, description, imageURL, cost, expiresAt);

      const newTitle = "Updated Test Project";
      const newDescription = "This is an updated test project";
      const newImageURL = "https://test.com/updated-image.jpg";
      const newExpiresAt = Math.floor(Date.now() / 1000) + 172800;

      const updateProjectTx = await dCharity.connect(owner).updateProject(0, newTitle, newDescription, newImageURL, newExpiresAt);
      const updateProjectReceipt = await updateProjectTx.wait();

      const blockTimestamp = await getBlockTimestamp(updateProjectReceipt.blockNumber);

      // Check for the correct event emission
      expect(updateProjectReceipt.events).to.satisfy(function (events) {
        const event = events.find(
          (e) => e.event === "Action" && e.args.actionType === "PROJECT_UPDATED"
        );

        if (!event) return false;

        return event.args.executor === owner.address && event.args.timestamp.eq(blockTimestamp);
      });

      // Check if the project properties are updated correctly
      const updatedProject = await dCharity.getProject(0);

      expect(updatedProject.title).to.equal(newTitle);
      expect(updatedProject.description).to.equal(newDescription);
      expect(updatedProject.imageURL).to.equal(newImageURL);
      expect(updatedProject.expiresAt).to.equal(newExpiresAt);
    });
  });

  describe("Delete Project", function () {
    const { title, description, imageURL, cost, expiresAt } = setupTestProjectData();

    it("Should delete a project and emit an event", async function () {
      await dCharity
        .connect(owner)
        .createProject(title, description, imageURL, cost, expiresAt);

      const deleteProjectTx = await dCharity.connect(owner).deleteProject(0);
      const deleteProjectReceipt = await deleteProjectTx.wait();

      const blockTimestamp = await getBlockTimestamp(deleteProjectReceipt.blockNumber);

      // Check for the correct event emission
      expect(deleteProjectReceipt.events).to.satisfy(function (events) {
        const event = events.find(
          (e) => e.event === "Action" && e.args.actionType === "PROJECT_DELETED"
        );

        if (!event) return false;

        return event.args.executor === owner.address && event.args.timestamp.eq(blockTimestamp);
      });

      // Check if the project status is updated to DELETED
      const deletedProject = await dCharity.getProject(0);
      expect(deletedProject.status).to.equal(3); // 3 - Status.DELETED
    });
  });

  describe("Change Project Tax", function () {
    it("Should change project tax only by the owner", async function () {
      await expect(dCharity.connect(owner).changeTax(10)).to.not.be.reverted;
      expect(await dCharity.projectTax()).to.equal(10);

      await expect(dCharity.connect(addr1).changeTax(15)).to.be.revertedWith("Owner reserved only");
    });
  });

  describe("Support Project", function () {
    const { title, description, imageURL, cost, expiresAt } = setupTestProjectData();

    it("Should support a project and emit an event", async function () {
      await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);
      const supportAmount = ethers.utils.parseEther("1");

      // Support the project and wait for the transaction to be mined
      const supportProjectTx = await dCharity.connect(addr1).supportProject(0, { value: supportAmount });
      const supportProjectReceipt = await supportProjectTx.wait();

      const blockTimestamp = await getBlockTimestamp(supportProjectReceipt.blockNumber);

      expect(supportProjectReceipt.events).to.satisfy(function (events) {
        const event = events.find(
          (e) => e.event === "Action" && e.args.actionType === "PROJECT_BACKED"
        );

        if (!event) return false;

        return event.args.executor === addr1.address && event.args.timestamp.eq(blockTimestamp);
      });
    });

    it("Should update the project status to PAIDOUT", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 3600;

      await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);

      // Support the project to fully fund it and update the status to PAIDOUT
      await dCharity.connect(addr1).supportProject(0, { value: cost });

      const updatedProjectStatus = (await dCharity.getProject(0)).status;
      expect(updatedProjectStatus).to.equal(4); // 4 - Status.PAIDOUT
    });
  });

  describe("getAllSupporters", function () {
    const { title, description, imageURL, cost, expiresAt } = setupTestProjectData();

    it("Should return all supporters", async function () {
      await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);

      const supportAmount1 = ethers.utils.parseEther("0.5");
      await dCharity.connect(addr1).supportProject(0, { value: supportAmount1 });

      const supportAmount2 = ethers.utils.parseEther("1");
      await dCharity.connect(addr1).supportProject(0, { value: supportAmount2 });

      const allSupporters = await dCharity.getAllSupporters();

      // Check if the returned array has the correct length
      expect(allSupporters.length).to.equal(2);

      // Access tuple properties if the data is returned as a tuple
      expect(allSupporters[0][0]).to.equal(addr1.address);
      expect(allSupporters[0][1].toString()).to.equal(supportAmount1.toString());

      expect(allSupporters[1][0]).to.equal(addr1.address);
      expect(allSupporters[1][1].toString()).to.equal(supportAmount2.toString());
    });
  });
});
