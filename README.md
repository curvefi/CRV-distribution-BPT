# CRV Distribution Subgraph BPT transfers

### Subgraph to get Curve transfer events from Balancer BPT tokens needed for calculating historical CRV Distribution data

[CRV distribution subgraph BAL](https://thegraph.com/explorer/subgraph/pengiundev/crv-distribution-bal)

#### All BPT transfers query:

```sql
	query getTransfers($first: Int!, $skip: Int!) {
		  transferEvents(orderBy: block, orderDirection: asc, first: $first, skip: $skip) {
		    id
		    block
		    timestamp
		    transfers(orderBy: logIndex, orderDirection: asc) {
		      id
		      logIndex
		      from
		      to
		      value
		      address
		    }
		  }
	}
```