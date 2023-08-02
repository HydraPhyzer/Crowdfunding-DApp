// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFund {
    struct Account {
        string Name;
        address Address;
        string Image;
        uint256 Age;
    }
    mapping(address => Account) Accounts;
    struct Compaign {
        string Name;
        string Desc;
        string Image;
        uint256 TargetAmount;
        uint256 TotalAmount;
        address payable Owner;
        bool Status;
        uint256 DonorCount;
    }
    Compaign[] public AllCompaigns;
    mapping(uint256 => mapping(address => uint256)) public  Donors;
    address[] public DonorList;

    function CreateAccount(
        string memory N,
        string memory I,
        uint256 A
    ) public {
        require(
            Accounts[msg.sender].Address != msg.sender,
            "Account Already Existed"
        );
        Accounts[msg.sender] = Account({
            Name: N,
            Image: I,
            Address: msg.sender,
            Age: A
        });
    }

    function GetAccount() public view returns (Account memory) {
        require(
            Accounts[msg.sender].Address == msg.sender,
            "Account Does Not Exist"
        );
        return Accounts[msg.sender];
    }

    function CreateCompaign(
        string memory _Name,
        string memory _Desc,
        string memory _Image,
        uint256 _TargetAmount
    ) public {
        require(
            GetAccount().Address == msg.sender,
            "You Need Account to Create Compaign"
        );
        AllCompaigns.push(
            Compaign({
                Name: _Name,
                Desc: _Desc,
                Image: _Image,
                TargetAmount: _TargetAmount,
                TotalAmount: 0,
                Owner: payable(msg.sender),
                Status: true,
                DonorCount: 0
            })
        );
    }

    function GetUserCompaigns() public view returns (Compaign[] memory) {
        uint256 userCampaignCount = 0;

        // First, count the user's campaigns to determine the array size
        for (uint256 i = 0; i < AllCompaigns.length; i++) {
            if (AllCompaigns[i].Owner == msg.sender) {
                userCampaignCount++;
            }
        }

        // Create a dynamic array to store the user's campaigns
        Compaign[] memory userComp = new Compaign[](userCampaignCount);

        // Add user's campaigns to the array
        uint256 index = 0;
        for (uint256 i = 0; i < AllCompaigns.length; i++) {
            if (AllCompaigns[i].Owner == msg.sender) {
                userComp[index] = AllCompaigns[i];
                index++;
            }
        }

        return userComp;
    }

    function Donate(uint256 CmpID) public payable {
        require(
            GetAccount().Address == msg.sender,
            "You Need Account to Create Compaign"
        );
        Donors[CmpID][msg.sender] = msg.value;
        AllCompaigns[CmpID].TotalAmount += msg.value;
        AllCompaigns[CmpID].DonorCount += 1;
        DonorList.push(msg.sender);
    }

    function EndCompaign(uint256 ID) public {
        AllCompaigns[ID].Owner.transfer(AllCompaigns[ID].TotalAmount);
        AllCompaigns[ID].Status = false;
    }

    function GetDonors(uint256 ID) public view returns (address[] memory) {
        address[] memory List = new address[](AllCompaigns[ID].DonorCount);

        for (uint256 I = 0; I < AllCompaigns[ID].DonorCount; I++) {
            for (uint256 J = 0; J < DonorList.length; J++) {
                if (Donors[ID][DonorList[J]] >= 0) {
                    List[I] = DonorList[I];
                }
            }
        }
        return List;
    }
    function GetAllCompaigns() public view  returns(Compaign[] memory){
        require(AllCompaigns.length>0, "No Compaigns Available");
        Compaign[] memory AllCmps=new Compaign[](AllCompaigns.length);
        for(uint I=0 ; I<AllCompaigns.length ; I++){
            AllCmps[I]=AllCompaigns[I];
        }
        return AllCmps;
    }
}
