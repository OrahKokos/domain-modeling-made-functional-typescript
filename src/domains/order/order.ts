// ----------------------
// Processes
// ----------------------
// process "Place Order" =
//   input: UnvalidatedOrder
//   output (on success):
//     OrderAcknowledgmentSent
//     AND OrderPlaced (to send to shipping)
//     AND BillableOrderPlaced (to send to billing)
//   output (on error):
//     InvalidOrder
