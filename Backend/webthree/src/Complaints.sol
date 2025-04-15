// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComplaintBox {

    struct Complaint {
        address owner;
        uint256 timestamp;
        uint256 upvotes;
        uint256 downvotes;
        string title;
        string description;
    }

    mapping(uint256 => Complaint) public complaints;
    mapping(address => mapping(uint256 => uint256)) public userVotes; // 0: No Vote, 1: Upvote, 2: Downvote
    mapping(address => uint256) public lastComplaintTime; 
    uint256[] public complaintIds;

    uint256 public complaintCount;
    uint256 public constant COMPLAINT_COOLDOWN = 6 hours;

    // Events
    event ComplaintPosted(uint256 complaintId, address owner, string title, string description, uint256 timestamp);
    event ComplaintVoted(uint256 complaintId, address voter, bool upvote, uint256 upvotes, uint256 downvotes, bool isRevocation);

    // Modifiers
    modifier notVoted(uint256 _complaintId) {
        require(userVotes[msg.sender][_complaintId] == 0, "You have already voted on this complaint.");
        _;
    }

    modifier hasVoted(uint256 _complaintId) {
        require(userVotes[msg.sender][_complaintId] != 0, "You have not voted on this complaint.");
        _;
    }

    modifier canPostComplaint() {
        uint256 lastPostTime = lastComplaintTime[msg.sender];
        require(block.timestamp >= lastPostTime + COMPLAINT_COOLDOWN, "You can only post a complaint every 6 hours.");
        _;
    }

    modifier validComplaint(uint256 _complaintId) {
        require(_complaintId <= complaintCount, "Complaint does not exist!");
        _;
    }

    function postComplaint(string memory _title, string memory _description) public canPostComplaint {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_title).length <= 100, "Title must be less than 100 characters");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_description).length <= 500, "Description must be less than 500 characters");

        complaintCount++;
        complaints[complaintCount] = Complaint({
            owner: msg.sender,
            title: _title,
            description: _description,
            upvotes: 0,
            downvotes: 0,
            timestamp: block.timestamp
        });
        complaintIds.push(complaintCount);

        lastComplaintTime[msg.sender] = block.timestamp;

        emit ComplaintPosted(complaintCount, msg.sender, _title, _description, block.timestamp);
    }

    function getAllComplaints() public view returns (Complaint[] memory) {
        Complaint[] memory allComplaints = new Complaint[](complaintIds.length);
        for (uint256 i = 0; i < complaintIds.length; i++) {
            uint256 complaintId = complaintIds[complaintIds.length - 1 - i];
            allComplaints[i] = complaints[complaintId];
        }
        return allComplaints;
    }

    function getComplaint(uint256 _complaintId) public view validComplaint(_complaintId) returns (address owner, string memory title, string memory description, uint256 upvotes, uint256 downvotes, uint256 timestamp) {
        Complaint memory complaint = complaints[_complaintId];
        return (complaint.owner, complaint.title, complaint.description, complaint.upvotes, complaint.downvotes, complaint.timestamp);
    }

    function upvote(uint256 _complaintId) public validComplaint(_complaintId) notVoted(_complaintId) {
        complaints[_complaintId].upvotes++;
        userVotes[msg.sender][_complaintId] = 1;

        emit ComplaintVoted(_complaintId, msg.sender, true, complaints[_complaintId].upvotes, complaints[_complaintId].downvotes, false);
    }

    function downvote(uint256 _complaintId) public validComplaint(_complaintId) notVoted(_complaintId) {
        complaints[_complaintId].downvotes++;
        userVotes[msg.sender][_complaintId] = 2;

        emit ComplaintVoted(_complaintId, msg.sender, false, complaints[_complaintId].upvotes, complaints[_complaintId].downvotes, false);
    }

    function changeVote(uint256 _complaintId) public validComplaint(_complaintId) hasVoted(_complaintId) {
        uint256 currentVote = userVotes[msg.sender][_complaintId];
        
        if (currentVote == 1) {
            complaints[_complaintId].upvotes--;
            complaints[_complaintId].downvotes++;
            userVotes[msg.sender][_complaintId] = 2;
            emit ComplaintVoted(_complaintId, msg.sender, false, complaints[_complaintId].upvotes, complaints[_complaintId].downvotes, false);
        } else if (currentVote == 2) {
            complaints[_complaintId].downvotes--;
            complaints[_complaintId].upvotes++;
            userVotes[msg.sender][_complaintId] = 1;
            emit ComplaintVoted(_complaintId, msg.sender, true, complaints[_complaintId].upvotes, complaints[_complaintId].downvotes, false);
        }
    }

    function revokeVote(uint256 _complaintId) public validComplaint(_complaintId) hasVoted(_complaintId) {
        uint256 currentVote = userVotes[msg.sender][_complaintId];
        
        if (currentVote == 1) {
            complaints[_complaintId].upvotes--;
        } else if (currentVote == 2) {
            complaints[_complaintId].downvotes--;
        }

        userVotes[msg.sender][_complaintId] = 0;  
        emit ComplaintVoted(_complaintId, msg.sender, false, complaints[_complaintId].upvotes, complaints[_complaintId].downvotes, true);
    }
}
