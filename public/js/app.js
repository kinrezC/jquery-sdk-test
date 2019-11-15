window.addEventListener("load", async () => {
  try {

    if(window.terminal.ethereum){
      console.log('SDK detected ');
      // NOTE @jsonsivar: this means that Terminal
      // SDK is loaded and it already overrides
      // window.web3 with the Terminal+MetaMask provider

      // NOTE @jsonsivar: this is better practice
      const detectedAccounts = await ethereum.enable();
      window.web3Accounts = detectedAccounts;
    }else{
      if(window.ethereum){
        window.web3 = new Web3(window.ethereum);
        await ethereum.enable();
      }else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
      }else{
        console.log("No Web3 detected");
      }
    }

    // Handle different events to keep dapp state updated:
    // https://metamask.github.io/metamask-docs/API_Reference/Ethereum_Provider

    let defaultAccount = web3.eth.defaultAccount;
    ethereum.on('accountsChanged', function (accounts) {
      defaultAccount= web3.eth.defaultAccount;
      console.log('defaultAccount: ' + defaultAccount);
    })

    ethereum.on('chainChanged', function (chainId) {
      // Time to make sure your any calls are directed to the correct chain!
    })

    const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
    const signer = provider.getSigner();

    const networkId = 1;

    // NOTE @jsonsivar: this is returning undefined, and not common practice
    // also it's not being used anywhere so what's the point?
    // I think best practice was is https://github.com/ethereum/wiki/wiki/JavaScript-API#web3versionnetwork
    const detectedNetworkId = window.web3.currentProvider.networkVersion;

    const accounts = window.web3Accounts;
    $("#get-block").click(function() {
      web3.eth.sendTransaction(
        {
          from: web3.eth.defaultAccount,
          to: web3.eth.defaultAccount, // nice try
          value: 10000
        },
        (e, r) => console.log(r)
      );
    });
  } catch (e) {
    console.log(e);
  }
});
