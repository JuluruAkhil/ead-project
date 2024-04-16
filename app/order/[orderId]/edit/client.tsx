"use client"

import { useState } from "react"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function Client({
  order,
  items,
  customers,
  salesReps,
  editAction,
  isManager,
}) {
  const [orderData, setOrderData] = useState(order)

  const status = ["pending", "approved", "rejected"]

  const handleCustomerChange = (customerId) => {
    setOrderData({
      ...orderData,
      customerId: customerId,
    })
  }

  const handleSalesRepChange = (salesRepId) => {
    setOrderData({
      ...orderData,
      salesRepId: salesRepId,
    })
  }

  const handleItemChange = (itemId) => {
    setOrderData({
      ...orderData,
      itemId: itemId,
    })
  }

  const handleQuantityChange = (event) => {
    setOrderData({
      ...orderData,
      itemQuantity: event.target.value,
    })
  }

  const handlePriceChange = (event) => {
    setOrderData({
      ...orderData,
      pricePerItem: event.target.value,
    })
  }

  const handleStatusChange = (event) => {
    setOrderData({
      ...orderData,
      status: event,
    })
  }

  const handleReasonChange = (event) => {
    setOrderData({
      ...orderData,
      rejectionReason: event.target.value,
    })
  }

  return (
    <form action={editAction}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Edit Order</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <input type="text" value={orderData.id} name="orderId" hidden />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm" htmlFor="customer">
                Customer
              </Label>
              <Select
                name="customer"
                value={orderData.customerId}
                onValueChange={handleCustomerChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Customer Name</SelectLabel>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm" htmlFor="salesRep">
                Sales Representative
              </Label>
              <Select
                name="salesRep"
                value={orderData.salesRepId}
                onValueChange={handleSalesRepChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sales rep" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sales Rep</SelectLabel>
                    {salesReps.map((salesRep) => (
                      <SelectItem key={salesRep.id} value={salesRep.id}>
                        {salesRep.email}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-sm" htmlFor="item">
              Item
            </Label>
            <Select
              name="item"
              value={orderData.itemId}
              onValueChange={handleItemChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Item Name</SelectLabel>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm" htmlFor="quantity">
                Quantity
              </Label>
              <Input
                value={orderData.itemQuantity}
                id="quantity"
                onChange={handleQuantityChange}
                name="quantity"
              />
            </div>
            <div>
              <Label className="text-sm" htmlFor="price">
                Price per item
              </Label>
              <Input
                value={orderData.pricePerItem}
                id="price"
                onChange={handlePriceChange}
                name="price"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm" htmlFor="status">
              Status
            </Label>
            <Select
              name="status"
              value={orderData.status}
              onValueChange={handleStatusChange}
              disabled={!isManager}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Item Name</SelectLabel>
                  {status.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {orderData.status === "rejected" && (
            <div>
              <Label className="text-sm" htmlFor="reason">
                Reason for rejection
              </Label>
              <Textarea
                className="min-h-[100px]"
                id="reason"
                value={
                  orderData.rejectionReason === null
                    ? ""
                    : orderData.rejectionReason
                }
                onChange={handleReasonChange}
                placeholder="Enter the reason for rejection..."
                name="reason"
              />
            </div>
          )}
          <Button type="submit">Submit</Button>
        </CardContent>
      </Card>
    </form>
  )
}
