const { expect } = require("chai");

describe("DCharity", function () {
  let owner, addr1, addr2, DCharity, dCharity;

  beforeEach(async function () {
    DCharity = await ethers.getContractFactory("DCharity");
    [owner, addr1, addr2] = await ethers.getSigners();
    dCharity = await DCharity.deploy(5);
  });

  async function getBlockTimestamp(blockNumber) {
    const block = await ethers.provider.getBlock(blockNumber);
    return block.timestamp;
  }

  describe("Deployment", function () {
    it("Should set the correct owner and project tax", async function () {
      expect(await dCharity.owner()).to.equal(owner.address);
      expect(await dCharity.projectTax()).to.equal(5);
    });
  });

  describe("Create Project", function () {
    it("Should create a project and emit an event", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 86400;

      const createProjectTx = await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);
      const createProjectReceipt = await createProjectTx.wait();

      expect(createProjectReceipt.events).to.satisfy(async function (events) {
        const event = events.find(
          (event) => event.event === "Action" && event.args.actionType === "PROJECT CREATED"
        );

        if (!event) return false;

        const block = await ethers.provider.getBlock(createProjectReceipt.blockNumber);
        return event.args.executor === owner.address && event.args.timestamp.eq(block.timestamp);
      });
    });
  });

  describe("Support Project", function () {
    it("Should support a project and emit an event", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 86400;

      await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);

      const supportProjectTx = await dCharity.connect(addr1).supportProject(0, { value: ethers.utils.parseEther("0.5") });
      const supportProjectReceipt = await supportProjectTx.wait();

      const blockTimestamp = await getBlockTimestamp(supportProjectReceipt.blockNumber);

      expect(supportProjectReceipt.events).to.satisfy(function (events) {
        const event = events.find(
          (event) => event.event === "Action" && event.args.actionType === "PROJECT BACKEND"
        );

        if (!event) return false;

        return event.args.executor === addr1.address && event.args.timestamp.eq(blockTimestamp);
      });
    });
  });

  describe("Update Project", function () {
    it("Should update a project and emit an event", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 86400;

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

      expect(updateProjectReceipt.events).to.satisfy(function (events) {
        const event = events.find(
          (event) => event.event === "Action" && event.args.actionType === "PROJECT UPDATED"
        );

        if (!event) return false;

        return event.args.executor === owner.address && event.args.timestamp.eq(blockTimestamp);
      });
    });
  });

  describe("Delete Project", function () {
    it("Should delete a project and emit an event", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 86400;

      await dCharity
        .connect(owner)
        .createProject(title, description, imageURL, cost, expiresAt);

      const deleteProjectTx = await dCharity.connect(owner).deleteProject(0);
      const deleteProjectReceipt = await deleteProjectTx.wait();

      const blockTimestamp = await getBlockTimestamp(deleteProjectReceipt.blockNumber);

      expect(deleteProjectReceipt.events).to.satisfy(function (events) {
        const event = events.find(
          (event) => event.event === "Action" && event.args.actionType === "PROJECT DELETED"
        );

        if (!event) return false;

        return event.args.executor === owner.address && event.args.timestamp.eq(blockTimestamp);
      });
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
    it("Should support a project and emit an event", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 86400;

      await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);
      const supportAmount = ethers.utils.parseEther("1");

      // Support the project and wait for the transaction to be mined
      const supportProjectTx = await dCharity.connect(addr1).supportProject(0, { value: supportAmount });
      await supportProjectTx.wait();

      const blockTimestamp = await getBlockTimestamp(supportProjectTx.blockNumber);
      await expect(supportProjectTx)
        .to.emit(dCharity, "Action")
        .withArgs(0, "PROJECT BACKEND", addr1.address, blockTimestamp);
    });

    it("Should update the project status to PAIDOUT", async function () {
      const title = "Test Project";
      const description = "This is a test project";
      const imageURL = "https://test.com/image.jpg";
      const cost = ethers.utils.parseEther("1");
      const expiresAt = Math.floor(Date.now() / 1000) + 3600; // expires in one hour
      await dCharity.connect(owner).createProject(title, description, imageURL, cost, expiresAt);

      // Support the project to fully fund it and update the status to PAIDOUT
      await dCharity.connect(addr1).supportProject(0, { value: cost });

      const updatedProjectStatus = (await dCharity.getProject(0)).status;
      expect(updatedProjectStatus).to.equal(4);
    });
  });
});
