import { BigInt, log, Address } from "@graphprotocol/graph-ts"
import { Contract, Approval, Transfer } from "../generated/Contract/Contract"
import { TransferEvent as TransferEventEntity, Transfer as TransferEntity } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let eventid = event.block.hash.toHex() + '-' + event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let theevent = new TransferEntity(eventid)
  theevent.address = event.address
  theevent.logIndex = event.logIndex
  theevent.from = event.params.from
  theevent.to = event.params.to
  theevent.value = event.params.value
  theevent.save()

  let entity = TransferEventEntity.load(event.transaction.hash.toHex())
  if(!entity) {
    entity = new TransferEventEntity(event.transaction.hash.toHex())
    entity.block = event.block.number
    entity.timestamp = event.block.timestamp
    entity.transfers = [eventid]
  }
  else {
    let transfers = entity.transfers
    transfers.push(eventid)
    entity.transfers = transfers
  }

  entity.save()

  //handleBlock(event)
}