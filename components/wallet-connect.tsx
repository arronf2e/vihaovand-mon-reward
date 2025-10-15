"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, Copy, LogOut, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletConnectProps {
  connected: boolean
  address: string
  onConnect: (address: string) => void
  onDisconnect: () => void
}

export function WalletConnect({ connected, address, onConnect, onDisconnect }: WalletConnectProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleConnect = async () => {
    // 模拟钱包连接
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })
        onConnect(accounts[0])
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to your wallet",
        })
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        // 如果没有真实钱包，使用模拟地址
        const mockAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
        onConnect(mockAddress)
        toast({
          title: "Demo Mode",
          description: "Connected with demo wallet address",
        })
      }
    } else {
      // 没有钱包扩展时使用模拟地址
      const mockAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      onConnect(mockAddress)
      toast({
        title: "Demo Mode",
        description: "Connected with demo wallet address",
      })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!connected) {
    return (
      <Button onClick={handleConnect} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10 bg-transparent">
          <Wallet className="h-4 w-4" />
          <span className="font-mono">{formatAddress(address)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Connected Wallet</p>
            <p className="text-xs leading-none text-muted-foreground font-mono">{formatAddress(address)}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Address</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDisconnect} className="gap-2 cursor-pointer text-destructive">
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
