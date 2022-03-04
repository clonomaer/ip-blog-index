//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract IPBlogV1 {
    struct Content {
        uint256 publishedOn; // timestamp
        address author;
    }
    mapping(bytes32 => Content) public detailsOf;
    bytes32[] public allContents;
    mapping(address => bytes32[]) public worksOf;
    address[] public allAuthors;

    event NewPost(address author, bytes32 cid, uint256 timestamp);
    event NewAuthor(address author);

    constructor() {}

    function publish(bytes32 cid) external {
        require(
            detailsOf[cid].author == address(0),
            "E0x01 cannot republish a content that is already published"
        );
        detailsOf[cid] = Content(block.timestamp, msg.sender);
        allContents.push(cid);
        if (worksOf[msg.sender].length == 0) {
            allAuthors.push(msg.sender);
            emit NewAuthor(msg.sender);
        }
        worksOf[msg.sender].push(cid);
        emit NewPost(msg.sender, cid, block.timestamp);
    }

    function getAllContents() external view returns (bytes32[] memory) {
        return allContents;
    }

    function getAllAuthors() external view returns (address[] memory) {
        return allAuthors;
    }

    function getWorksOf(address author)
        external
        view
        returns (bytes32[] memory)
    {
        return worksOf[author];
    }
}
