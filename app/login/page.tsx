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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useRef } from "react"

export default function Page() {
  const emailRef = useRef<string>("")
  const passwordRef = useRef<string>("")

  const handleLogin = async () => {
    await signIn("credentials", {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: "/",
    })
  }

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            name="email"
            onChange={(e) => (emailRef.current = e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            required
            type="password"
            name="password"
            onChange={(e) => (passwordRef.current = e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-3">
        <Button onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
  )
}
