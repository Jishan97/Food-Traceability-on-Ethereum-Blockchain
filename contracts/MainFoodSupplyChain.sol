pragma solidity ^0.8.0;

contract MainFoodSupplyChain {


    // Stock Keeping Unit 

    uint SKU;

    // Supply chain state

    enum SupplyChainState {
        producedByFarmer,
        processing,
        packing,
        in_transit,
        receivedAtRetail,
        purchasedByCustomer
    }

    // Prouct information

    struct Product {
        uint product_id;
        uint UPC;
        uint SKU;
        string name;
        uint price;
        string location;
        string date;
        address owner;
        uint parent_product;
        SupplyChainState state;

        address processing_company;
        address packing_company;
        address logistic_comapny;
        address retail;
    }

    mapping (uint=> Product) products;


    struct History_blocks {
        uint Pro_C;
        uint Pac_C;
        uint L_C;
        uint R;
    }

    mapping (uint=> History_blocks) product_history;

  address owner;


  constructor()  payable {
    owner = msg.sender;
    SKU = 1;
      }

    // Get product detail
  event getPoductDetails(uint upc, string name, uint step);

    
    //Event 1 => Item produced by farmer or any owner 
    event ItemProduced(uint _productUPC, string _name  ,uint _step);

   //Event 2 => Item reached at processing company 
    event ItemInProcessing(uint _productUPC, string _name  ,uint _step);

    //Event 3 => Item reached at packing facility
    event ItemAtPackingFacility(uint _productUPC, string _name  ,uint _step);

    //Event 4 => Item in transit
    event ItemInTransit(uint _productUPC, string _name  ,uint _step);

    //Event 4 => Item reached at retail company
    event ItemReachedAtRetail(uint _productUPC, string _name  ,uint _step);

 //Event 5 => Get block nuber
    event BlockNumber(uint processingCompany, uint packingCompany, uint logisticCompany, uint retailCompany);

      event History1(uint upc, uint sku, string name, uint price, string location);
    event History2(string date, address owner, uint parent_product, SupplyChainState state);
       event History3(address processing_company, address packing_company,
    address logistic_comapny, address retail);


    // Farmers adding product to blockchain 


    // farmer address - address 1st 
    // address constant public ownerFarmer = 0x3fdB18E93232F67a3f697f6ecf0fDdD22157fF2B;

    function produceItem(
        uint _UPC,
        string memory _name,
        uint _price,
        string memory _location,
        string memory _date,
        uint _parent_product) public  {

            // check if farmer or not
        // require(msg.sender == ownerFarmer, "Only Farmer/Owner can produce item");
        products[_UPC].UPC = _UPC;
        products[_UPC].SKU = SKU;
        products[_UPC].name = _name;
        products[_UPC].price = _price;
        products[_UPC].location = _location;
        products[_UPC].date = _date;
        products[_UPC].parent_product = _parent_product;
        products[_UPC].product_id = _UPC + SKU;
        products[_UPC].state = SupplyChainState.producedByFarmer;
        products[_UPC].owner = msg.sender;

        // emit event 
        emit ItemProduced(_UPC, _name ,uint(products[_UPC].state));

        SKU++;

    }


    // Trigger supply chain to food processing 
    function triggerFoodProcessing(uint _upc) public {
        // check if the address is of Food Processing Company
        // Give ownership to Food Processing company 

        products[_upc].owner = msg.sender;
        products[_upc].processing_company = msg.sender;
        products[_upc].state = SupplyChainState.processing;

        //Add block number for history 

        product_history[_upc].Pro_C = block.number;

       emit ItemInProcessing(_upc,  products[_upc].name ,uint(products[_upc].state));
 

    }

    // Trigger supply chain to food packing

  function triggerFoodPacking(uint _upc) public {
        // check if the address is of Food Processing Company
        // Give ownership to Food Packing company 

        products[_upc].owner = msg.sender;
        products[_upc].packing_company = msg.sender;
        products[_upc].state = SupplyChainState.packing;

        //Add block number for history 

        product_history[_upc].Pac_C = block.number;

       emit ItemAtPackingFacility(_upc,  products[_upc].name ,uint(products[_upc].state));
 

    }
    // Trigger supply chain to transport

  function triggerLogistic(uint _upc) public {
        // check if the address is of Food Logistic Company
        // Give ownership to Food Packing company 

        products[_upc].owner = msg.sender;
        products[_upc].logistic_comapny = msg.sender;
        products[_upc].state = SupplyChainState.in_transit;

        //Add block number for history 

        product_history[_upc].L_C = block.number;

       emit ItemInTransit(_upc,  products[_upc].name ,uint(products[_upc].state));
 

    }
    // Trigger supply chain to retail 
  function triggerRetail(uint _upc) public {
        // check if the address is of Food Logistic Company
        // Give ownership to Food Packing company 

        products[_upc].owner = msg.sender;
        products[_upc].retail = msg.sender;
        products[_upc].state = SupplyChainState.receivedAtRetail;

        //Add block number for history 

        product_history[_upc].R = block.number;

       emit ItemReachedAtRetail(_upc,  products[_upc].name ,uint(products[_upc].state));
 

    }


    // Customer bought the product



    // check provenance of product - customer 

    function getProvenanceOne(uint _upc) public  returns(
         uint UPC,
        uint SKU,
        string memory name,
        uint price,
        string memory location
    ) {


        emit History1(_upc,products[_upc].SKU,products[_upc].name,products[_upc].price,products[_upc].location);

            return (
                uint(products[_upc].UPC),
                products[_upc].SKU,
                products[_upc].name,
                products[_upc].price,
                products[_upc].location
            );
    }
    



    function getProvenanceTwo(uint _upc) public  returns(
        string memory date,
        address owner,
        uint parent_product,
        SupplyChainState state
    ) {
                emit History2(products[_upc].date,
                products[_upc].owner,
                products[_upc].parent_product,
                products[_upc].state);
            return (
                products[_upc].date,
                products[_upc].owner,
                products[_upc].parent_product,
                products[_upc].state


            );
    }


  function getProvenanceThree(uint _upc) public  returns(
      address processing_company,
        address packing_company,
        address logistic_comapny,
        address retail
    ) {
              emit History3 ( products[_upc].processing_company,
                products[_upc].packing_company,
                products[_upc].logistic_comapny,
                products[_upc].retail);
            return (
                products[_upc].processing_company,
                products[_upc].packing_company,
                products[_upc].logistic_comapny,
                products[_upc].retail


            );
    }


    function getBlockHistory(uint _upc) public  returns (
        uint blockProcessingCompany,
        uint blockPackingCompany,
        uint blockLogisticCompany,
        uint blockRetail
    ) {

      emit BlockNumber(product_history[_upc].Pro_C,
        product_history[_upc].Pac_C,
        product_history[_upc].L_C,
        product_history[_upc].R);

        return (
        product_history[_upc].Pro_C,
        product_history[_upc].Pac_C,
        product_history[_upc].L_C,
        product_history[_upc].R
        );
    

    }

 
     
  function getProduct(uint _upc) public {
        emit getPoductDetails(products[_upc].UPC,products[_upc].name, uint(products[_upc].state));
  }

    
}

