// Order Quantity
// data OrderQuantity = UnitQuantity OR KilogramQuantity
// data UnitQuantity = ...
// data KilogramQuantity = ...

// ----------------------
// Order lifecycle
// ----------------------
// ----- unvalidated state -----
// data UnvalidatedOrder =
//   UnvalidatedCustomerInfo
//   AND UnvalidatedShippingAddress
//   AND UnvalidatedBillingAddress
//   AND list of UnvalidatedOrderLine
// data UnvalidatedOrderLine =
//   UnvalidatedProductCode
//   AND UnvalidatedOrderQuantity

// ----- validated state -----
// data ValidatedOrder = ...
// data ValidatedOrderLine = ...

// ----- priced state -----
// data PricedOrder = ...
// data PricedOrderLine = ...

// ----- output events -----
// data OrderAcknowledgmentSent = ...
// data OrderPlaced = ...
// data BillableOrderPlaced = ...
