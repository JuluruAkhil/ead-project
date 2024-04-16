"use client"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Client({ items, customers, createSalesOrder }) {
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const handleChange = () => {
      const calculatedTotal = price * quantity
      setTotal(calculatedTotal)
    }
    handleChange()
  }, [price, quantity])

  return (
    <form action={createSalesOrder}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">New Sales Order</CardTitle>
          <CardDescription>
            Fill in the details below to create a new sales order.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="customer">
                Customer
              </Label>
              <Select name="customer">
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
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="item">
                Item
              </Label>
              <Select name="item">
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="price">
                Price per unit
              </Label>
              <Input
                id="price"
                placeholder="$"
                type="number"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                name="price"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="quantity">
                Quantity
              </Label>
              <Input
                id="quantity"
                placeholder="Quantity"
                type="number"
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                name="quantity"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="total">
              Total
            </Label>
            <Input
              disabled
              id="total"
              placeholder="Total"
              type="number"
              value={total}
              name="total"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/order/get">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
