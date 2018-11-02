# How to use the scatter to play DAPP on the private chain

## Configure scatter

### Prepare your account

1. Get identify : find the public key bound in scatter, or create a new public key.
2. Get account: Use this public key to create an account on the private chain, such as alice

### Configure private chain and account in scatter

1. Set network
    - Scatter Home -> Top Right Settings —> Network —> New
    - Configure the name as 'dev'
	- Select the protocol
	    e.p. http
	- Configure host as your sidechain address
	    e.p. 127.0.0.1
	- Configure port as your sidechain port
	    e.p. 7777
	- Configure the chain_id (generaly, the chain_id can be obtained from the /v1/chain/get_info of the nodeos api)

2、Import account in scatter
    - Scatter Home -> Identities —> New
    - Select network 'dev'
    - Select identity with active permission, such as alice@active

### Play

1. Open the Dapp connected to the private chain
2. Follow the prompts to choose your identity