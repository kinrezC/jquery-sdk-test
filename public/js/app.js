window.addEventListener("load", async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log("No Web3 detected");
    }

    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );

    const signer = provider.getSigner();
    const networkId = 1;

    const detectedNetworkId = window.web3.currentProvider.networkVersion;
    const accounts = web3.eth.accounts;
    console.log(accounts);
    $("#get-block").click(function() {
      web3.eth.sendTransaction(
        {
          from: web3.eth.defaultAccount,
          to: "0xeC1FEF973021d2eF6C4bC709b6f3eb1b4bbaB3aD",
          value: 10000
        },
        (e, r) => console.log(r)
      );
    });
  } catch (e) {
    console.log(e);
  }
});
